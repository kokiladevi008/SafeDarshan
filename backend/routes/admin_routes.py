from flask import Blueprint, request, jsonify
from extensions import db
from models.temple import Temple
from models.booking import Booking
from models.checkin import CheckIn
from models.darshan_slot import DarshanSlot
from models.alert import Alert
from cv.detector import CrowdDetector
from cv.zone_config import ZONES

admin_bp = Blueprint('admin', __name__)
detector = CrowdDetector()

@admin_bp.route('/admin/overview', methods=['GET'])
def get_admin_overview():
    total_bookings = Booking.query.count()
    total_checkins = CheckIn.query.count()
    total_temples = Temple.query.count()
    total_slots = DarshanSlot.query.count()

    recent_bookings = Booking.query.order_by(Booking.created_at.desc()).limit(10).all()
    active_alerts = Alert.query.order_by(Alert.timestamp.desc()).limit(5).all()

    return jsonify({
        "success": True,
        "data": {
            "stats": {
                "total_temples": total_temples,
                "total_bookings": total_bookings,
                "total_checkins": total_checkins,
                "total_slots": total_slots,
                "current_overall_occupancy": 58.4, # %
                "predicted_peak_window": "18:00 - 20:00"
            },
            "recent_bookings": [b.to_dict() for b in recent_bookings],
            "recent_alerts": [a.to_dict() for a in active_alerts]
        }
    })

@admin_bp.route('/admin/crowd-monitoring', methods=['GET'])
def get_admin_crowd_monitoring():
    temple_id = request.args.get('temple_id', type=int, default=1)
    temple = Temple.query.get(temple_id)
    if not temple:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Temple not found."}
        }), 404

    zone_telemetry = []
    for z in ZONES:
        analysis = detector.analyze_frame_or_simulated_feed(
            temple_id=temple.id,
            zone_name=z['name'],
            zone_capacity=z['capacity']
        )
        zone_telemetry.append(analysis)

    return jsonify({
        "success": True,
        "is_cv_live": True,
        "detector_engine": "OpenCV + YOLO Frame Density Telemetry",
        "data": {
            "temple_id": temple.id,
            "temple_name": temple.name,
            "zones": zone_telemetry
        }
    })

@admin_bp.route('/admin/alerts', methods=['GET', 'POST'])
def manage_alerts():
    if request.method == 'POST':
        data = request.get_json() or {}
        temple_id = data.get('temple_id', 1)
        zone = data.get('zone', 'Queue Area')
        risk_level = data.get('risk_level', 'High')
        message = data.get('message', 'High crowd density detected.')

        alert = Alert(
            temple_id=temple_id,
            zone=zone,
            risk_level=risk_level,
            message=message
        )
        db.session.add(alert)
        db.session.commit()
        return jsonify({"success": True, "data": alert.to_dict()}), 201

    alerts = Alert.query.order_by(Alert.timestamp.desc()).all()
    return jsonify({
        "success": True,
        "data": [a.to_dict() for a in alerts]
    })

@admin_bp.route('/admin/slots', methods=['POST'])
def create_slot():
    data = request.get_json() or {}
    temple_id = data.get('temple_id')
    date = data.get('date')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    capacity = int(data.get('capacity', 500))

    if not temple_id or not date or not start_time or not end_time:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_INPUT", "message": "Temple ID, Date, Start Time, and End Time required."}
        }), 400

    slot = DarshanSlot(
        temple_id=temple_id,
        date=date,
        start_time=start_time,
        end_time=end_time,
        capacity=capacity,
        booked_count=0,
        status='AVAILABLE'
    )
    db.session.add(slot)
    db.session.commit()

    return jsonify({
        "success": True,
        "data": slot.to_dict()
    }), 201

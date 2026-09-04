from flask import Blueprint, request, jsonify
from models.temple import Temple
from models.crowd_data import CrowdData
from models.darshan_slot import DarshanSlot
from ml.predictor import CrowdPredictor

crowd_bp = Blueprint('crowd', __name__)

@crowd_bp.route('/temples/<int:temple_id>/crowd', methods=['GET'])
def get_crowd_status(temple_id):
    temple = Temple.query.get(temple_id)
    if not temple:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Temple not found."}
        }), 404

    zones_data = CrowdData.query.filter_by(temple_id=temple_id).all()
    total_people = sum(z.people_count for z in zones_data) if zones_data else 320
    occupancy_pct = (total_people / max(1, temple.capacity)) * 100.0

    if occupancy_pct < 35:
        crowd_level = "Low"
        waiting_time = 20
    elif occupancy_pct < 65:
        crowd_level = "Moderate"
        waiting_time = 45
    elif occupancy_pct < 85:
        crowd_level = "High"
        waiting_time = 75
    else:
        crowd_level = "Very High"
        waiting_time = 120

    return jsonify({
        "success": True,
        "is_demo": True,
        "data": {
            "temple_id": temple.id,
            "temple_name": temple.name,
            "current_visitors": total_people,
            "capacity": temple.capacity,
            "occupancy_percentage": round(occupancy_pct, 1),
            "crowd_level": crowd_level,
            "estimated_waiting_time_minutes": waiting_time,
            "zones": [z.to_dict() for z in zones_data]
        }
    })

@crowd_bp.route('/temples/<int:temple_id>/prediction', methods=['GET'])
def get_crowd_prediction(temple_id):
    temple = Temple.query.get(temple_id)
    if not temple:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Temple not found."}
        }), 404

    date_str = request.args.get('date', '2026-09-15')
    time_str = request.args.get('time', '14:00-15:00')

    slots = DarshanSlot.query.filter_by(temple_id=temple_id).all()
    res = CrowdPredictor.predict_crowd_and_recommend(
        temple_id=temple.id,
        capacity=temple.capacity,
        current_booked=180,
        date_str=date_str,
        time_str=time_str,
        available_slots=slots
    )

    return jsonify(res)

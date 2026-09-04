from flask import Blueprint, request, jsonify
from extensions import db
from models.booking import Booking
from models.checkin import CheckIn

checkin_bp = Blueprint('checkin', __name__)

@checkin_bp.route('/checkin', methods=['POST'])
def process_checkin():
    data = request.get_json() or {}
    booking_code = data.get('booking_id')

    if not booking_code:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_INPUT", "message": "Booking ID is required for verification."}
        }), 400

    booking = Booking.query.filter_by(booking_id=booking_code).first()
    if not booking:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_BOOKING", "message": "Invalid Booking ID. No record found."}
        }), 404

    if booking.status == 'CHECKED_IN':
        return jsonify({
            "success": False,
            "error": {"code": "ALREADY_CHECKED_IN", "message": "This QR Pass has already been used for check-in."}
        }), 400

    if booking.status == 'CANCELLED':
        return jsonify({
            "success": False,
            "error": {"code": "BOOKING_CANCELLED", "message": "This booking pass has been cancelled."}
        }), 400

    # Record successful checkin
    checkin_record = CheckIn(
        booking_id=booking.id,
        status='SUCCESSFUL'
    )
    booking.status = 'CHECKED_IN'

    db.session.add(checkin_record)
    db.session.commit()

    return jsonify({
        "success": True,
        "data": {
            "visitor_name": booking.user.name if booking.user else "Devotee",
            "temple_name": booking.temple.name if booking.temple else "",
            "time": f"{booking.slot.start_time}-{booking.slot.end_time}" if booking.slot else "",
            "visitor_count": booking.visitor_count,
            "checkin_status": "SUCCESSFUL"
        }
    })

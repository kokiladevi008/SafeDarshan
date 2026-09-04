import random
from datetime import datetime
from flask import Blueprint, request, jsonify
from extensions import db
from models.booking import Booking
from models.darshan_slot import DarshanSlot
from models.temple import Temple
from models.user import User
from utils.qr_generator import generate_qr_base64

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/bookings', methods=['POST'])
def create_booking():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    temple_id = data.get('temple_id')
    slot_id = data.get('slot_id')
    visitor_count = int(data.get('visitor_count', 1))

    if not user_id or not temple_id or not slot_id:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_INPUT", "message": "User ID, Temple ID, and Slot ID are required."}
        }), 400

    slot = DarshanSlot.query.get(slot_id)
    if not slot or slot.status != 'AVAILABLE':
        return jsonify({
            "success": False,
            "error": {"code": "SLOT_UNAVAILABLE", "message": "Sorry, this slot is no longer available. Please choose another time."}
        }), 400

    if slot.booked_count + visitor_count > slot.capacity:
        return jsonify({
            "success": False,
            "error": {"code": "CAPACITY_EXCEEDED", "message": "Selected headcount exceeds remaining slot capacity."}
        }), 400

    # Generate unique SD booking ID e.g. SD20268491
    rand_num = random.randint(1000, 9999)
    booking_code = f"SD2026{rand_num}"
    
    # Increment slot booked count
    slot.booked_count += visitor_count
    if slot.booked_count >= slot.capacity:
        slot.status = 'FULL'

    booking = Booking(
        user_id=user_id,
        temple_id=temple_id,
        slot_id=slot_id,
        booking_id=booking_code,
        visitor_count=visitor_count,
        status='CONFIRMED'
    )

    db.session.add(booking)
    db.session.commit()

    qr_base64 = generate_qr_base64(booking_code)
    temple = Temple.query.get(temple_id)

    return jsonify({
        "success": True,
        "data": {
            "id": booking.id,
            "booking_id": booking.booking_id,
            "status": booking.status,
            "qr_code_base64": qr_base64,
            "temple_name": temple.name if temple else "",
            "temple_image": temple.image_url if temple else "",
            "date": slot.date,
            "time": f"{slot.start_time}-{slot.end_time}",
            "visitor_count": visitor_count,
            "created_at": booking.created_at.isoformat()
        }
    }), 201

@booking_bp.route('/bookings', methods=['GET'])
def get_user_bookings():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({
            "success": False,
            "error": {"code": "UNAUTHORIZED", "message": "User ID parameter required."}
        }), 401

    bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.created_at.desc()).all()
    results = []
    for b in bookings:
        b_dict = b.to_dict()
        b_dict['qr_code_base64'] = generate_qr_base64(b.booking_id)
        results.append(b_dict)

    return jsonify({
        "success": True,
        "data": results
    })

@booking_bp.route('/bookings/<string:booking_id>', methods=['GET'])
def get_booking_by_code(booking_id):
    booking = Booking.query.filter_by(booking_id=booking_id).first()
    if not booking:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Booking pass not found."}
        }), 404

    b_dict = booking.to_dict()
    b_dict['qr_code_base64'] = generate_qr_base64(booking.booking_id)

    return jsonify({
        "success": True,
        "data": b_dict
    })

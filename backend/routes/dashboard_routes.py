from flask import Blueprint, request, jsonify
from models.booking import Booking
from models.user import User

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def get_user_dashboard():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({
            "success": False,
            "error": {"code": "UNAUTHORIZED", "message": "User ID parameter required."}
        }), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "User not found."}
        }), 404

    user_bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.created_at.desc()).all()

    total_bookings = len(user_bookings)
    upcoming_bookings = [b.to_dict() for b in user_bookings if b.status == 'CONFIRMED']
    completed_bookings = [b.to_dict() for b in user_bookings if b.status == 'CHECKED_IN']

    return jsonify({
        "success": True,
        "data": {
            "user": user.to_dict(),
            "stats": {
                "total_bookings": total_bookings,
                "upcoming_count": len(upcoming_bookings),
                "completed_count": len(completed_bookings)
            },
            "upcoming_visits": upcoming_bookings,
            "recent_history": [b.to_dict() for b in user_bookings[:5]]
        }
    })

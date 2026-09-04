from flask import Blueprint, request, jsonify
from models.temple import Temple
from models.pooja_timing import PoojaTiming
from models.darshan_slot import DarshanSlot
from ml.predictor import CrowdPredictor

temple_bp = Blueprint('temple', __name__)

@temple_bp.route('/temples', methods=['GET'])
def get_temples():
    state = request.args.get('state')
    query = Temple.query
    if state:
        query = query.filter_by(state=state)
    
    temples = query.all()
    results = []
    
    for t in temples:
        t_dict = t.to_dict()
        # Attach live crowd indicator
        prediction = CrowdPredictor.predict_crowd_and_recommend(
            t.id, t.capacity, 150, "2026-09-03", "10:00"
        )
        p_data = prediction['data']
        t_dict['crowd_level'] = p_data['crowd_level']
        t_dict['waiting_time_minutes'] = p_data['waiting_time_minutes']
        t_dict['recommended_time'] = p_data['recommended_slot']
        results.append(t_dict)

    return jsonify({
        "success": True,
        "data": results
    })

@temple_bp.route('/temples/<int:temple_id>', methods=['GET'])
def get_temple_details(temple_id):
    temple = Temple.query.get(temple_id)
    if not temple:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Temple not found."}
        }), 404

    t_dict = temple.to_dict()
    prediction = CrowdPredictor.predict_crowd_and_recommend(
        temple.id, temple.capacity, 220, "2026-09-03", "10:00"
    )
    p_data = prediction['data']
    t_dict['crowd_level'] = p_data['crowd_level']
    t_dict['waiting_time_minutes'] = p_data['waiting_time_minutes']
    t_dict['recommended_time'] = p_data['recommended_slot']
    t_dict['occupancy_percentage'] = p_data['occupancy_percentage']

    return jsonify({
        "success": True,
        "data": t_dict
    })

@temple_bp.route('/temples/<int:temple_id>/timings', methods=['GET'])
def get_temple_timings(temple_id):
    temple = Temple.query.get(temple_id)
    if not temple:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "Temple not found."}
        }), 404

    return jsonify({
        "success": True,
        "data": {
            "temple_id": temple.id,
            "temple_name": temple.name,
            "opening_time": temple.opening_time,
            "closing_time": temple.closing_time
        }
    })

@temple_bp.route('/temples/<int:temple_id>/pooja', methods=['GET'])
def get_pooja_timings(temple_id):
    poojas = PoojaTiming.query.filter_by(temple_id=temple_id).all()
    return jsonify({
        "success": True,
        "data": [p.to_dict() for p in poojas]
    })

@temple_bp.route('/temples/<int:temple_id>/darshan', methods=['GET'])
def get_darshan_slots(temple_id):
    date_str = request.args.get('date')
    query = DarshanSlot.query.filter_by(temple_id=temple_id)
    if date_str:
        query = query.filter_by(date=date_str)
    
    slots = query.order_by(DarshanSlot.date.asc(), DarshanSlot.start_time.asc()).all()
    return jsonify({
        "success": True,
        "data": [s.to_dict() for s in slots]
    })

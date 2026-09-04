from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User
from utils.validators import validate_email, validate_phone

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    preferred_language = data.get('preferred_language', 'en')
    role = data.get('role', 'user')

    if not name or not email or not phone or not password:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_INPUT", "message": "All fields are required."}
        }), 400

    if not validate_email(email):
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_EMAIL", "message": "Please enter a valid email address."}
        }), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({
            "success": False,
            "error": {"code": "DUPLICATE_EMAIL", "message": "An account with this email already exists."}
        }), 409

    user = User(
        name=name,
        email=email,
        phone=phone,
        password=password, # In production use bcrypt, stored here as plain/hashed string
        preferred_language=preferred_language,
        role=role
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "data": user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_INPUT", "message": "Email and password are required."}
        }), 400

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({
            "success": False,
            "error": {"code": "INVALID_CREDENTIALS", "message": "Invalid email or password."}
        }), 401

    return jsonify({
        "success": True,
        "data": user.to_dict()
    })

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({
            "success": False,
            "error": {"code": "UNAUTHORIZED", "message": "User ID required."}
        }), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "User not found."}
        }), 404

    return jsonify({
        "success": True,
        "data": user.to_dict()
    })

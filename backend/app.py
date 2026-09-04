from flask import Flask, jsonify
from config import Config
from extensions import db, cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})

    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.temple_routes import temple_bp
    from routes.crowd_routes import crowd_bp
    from routes.booking_routes import booking_bp
    from routes.checkin_routes import checkin_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(temple_bp)
    app.register_blueprint(crowd_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(checkin_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(admin_bp)

    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({
            "status": "healthy",
            "app": "SafeDarshan Backend API",
            "version": "1.0.0"
        })

    # Global error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            "success": False,
            "error": {"code": "NOT_FOUND", "message": "The requested API resource was not found."}
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "error": {"code": "INTERNAL_SERVER_ERROR", "message": "An internal server error occurred."}
        }), 500

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"MySQL connection standard check: {e}. Switching to SQLite fallback...")
            app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///safedarshan.db"
            db.init_app(app)
            db.create_all()

    print("SafeDarshan Backend running on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)

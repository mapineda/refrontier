from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from .config import config_by_name

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
cors = CORS()

def create_app():
    app = Flask(__name__)

    config_name = os.getenv('FLASK_ENV', 'dev')
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    migrate = Migrate(app, db)
    

    with app.app_context():
        from .auth import auth_bp
        from .resources import resources_bp

        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(resources_bp, url_prefix='/api')
    
    @app.before_request
    def log_request_info():
        app.logger.debug('Headers: %s', request.headers)
        app.logger.debug('Body: %s', request.get_data())

    @app.errorhandler(404)
    def handle_404(e):
        app.logger.warning('404 error at %s', request.url)
        return jsonify(error=str(e)), 404

    return app

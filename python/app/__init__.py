import logging
from flask import Flask
from .config import app_config, config_name
from .models.predictor import Predictor
from .repositories import database

def create_app():
    """Application Factory Function"""
    app = Flask(__name__)

    app.config.from_object(app_config)
    print(f" * Loading configuration: {config_name}")

    log_level = app.config.get('LOG_LEVEL', 'INFO')
    logging.basicConfig(level=log_level,
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    logger = logging.getLogger(__name__)
    logger.info(f"Application starting with config: {config_name}")
    logger.info(f"Log level set to: {log_level}")


    with app.app_context():
        database.init_app(app)

        try:
            Predictor.load_model()
        except (RuntimeError, FileNotFoundError) as e:
            logger.error(f"CRITICAL: Failed to load ML model on startup: {e}")

        from .routes.home import home_bp
        from .routes.predict import predict_bp
        app.register_blueprint(home_bp, url_prefix='/')
        app.register_blueprint(predict_bp)
        logger.info("Blueprints registered.")

    logger.info("Application setup complete.")
    return app

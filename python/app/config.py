import os

class Config:
    """Base configuration settings. Reads values from environment variables."""
    SECRET_KEY = os.getenv('SECRET_KEY')
    API_KEY = os.getenv('API_KEY')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = int(os.getenv('DB_PORT'))
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')

    MODEL_PATH = os.getenv('MODEL_PATH')

    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO').upper()

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'DEBUG').upper()

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False

config_by_name = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig
}

config_name = os.getenv('APP_ENV', 'dev').lower()
app_config = config_by_name.get(config_name, DevelopmentConfig)()

if config_name == 'prod':
    if not app_config.API_KEY:
        raise ValueError("Production configuration requires PREDICTION_API_KEY environment variable.")
    if not app_config.DB_USER or not app_config.DB_PASSWORD:
        raise ValueError("Production configuration requires DB_USER and DB_PASSWORD environment variables.")
    if app_config.SECRET_KEY == 'a-default-dev-secret-key':
         print("WARNING: Using default SECRET_KEY in production. Set a strong SECRET_KEY environment variable.")

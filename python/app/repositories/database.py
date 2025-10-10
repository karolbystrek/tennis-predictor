import mysql.connector
import logging
from flask import current_app, g

logger = logging.getLogger(__name__)

def get_db():
    """
    Connects to the specific database. Attaches connection to Flask's 'g' object,
    which lasts for one request.
    """
    if 'db' not in g:
        try:
            g.db = mysql.connector.connect(
                host=current_app.config['DB_HOST'],
                port=current_app.config['DB_PORT'],
                user=current_app.config['DB_USER'],
                password=current_app.config['DB_PASSWORD'],
                database=current_app.config['DB_NAME']
            )
            logger.debug("New database connection established for request.")
        except mysql.connector.Error as err:
            logger.error(f"Error connecting to database: {err}")
            raise ConnectionError(f"Database connection failed: {err}") from err
    return g.db

def close_db(e=None):
    """
    Closes the database connection at the end of the request.
    Registered with Flask app context teardown.
    """
    db = g.pop('db', None)
    if db is not None and db.is_connected():
        db.close()
        logger.debug("Database connection closed for request.")

def init_app(app):
    """Register database functions with the Flask app."""
    app.teardown_appcontext(close_db)
    logger.info("Database teardown function registered.")

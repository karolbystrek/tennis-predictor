import functools
from flask import request, jsonify, current_app, g
import logging
import hmac

logger = logging.getLogger(__name__)

def require_api_key(func):
    """Decorator to require a valid API key for an endpoint."""
    @functools.wraps(func)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-KEY')
        expected_key = current_app.config.get('API_KEY')

        if not expected_key:
            logger.error("API_KEY is not configured in the application.")
            return jsonify({"error": "API key authentication is not configured correctly."}), 500

        if api_key and hmac.compare_digest(str(api_key), str(expected_key)):
            g.api_key = api_key
            return func(*args, **kwargs)
        else:
            logger.warning("Unauthorized access attempt: Invalid or missing API key.")
            return jsonify({"error": "Unauthorized"}), 403
    return decorated_function

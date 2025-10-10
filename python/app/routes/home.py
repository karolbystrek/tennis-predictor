from flask import Blueprint, jsonify

home_bp = Blueprint('home_bp', __name__)

@home_bp.route('/')
def home():
    """Provides basic information about the API."""
    return jsonify({
        "message": "Tennis Match Predictor API",
        "endpoints": {
            "/predict": "POST match data (JSON) to get prediction."
        }
    }), 200

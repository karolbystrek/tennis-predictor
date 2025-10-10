import logging
from flask import Blueprint, request, jsonify, current_app
from ..services import prediction_service
from ..utils.decorators import require_api_key

logger = logging.getLogger(__name__)

predict_bp = Blueprint('predict_bp', __name__, url_prefix='/predict')

@predict_bp.route('', methods=['POST'])
@require_api_key
def post_prediction_request():
    """Handles POST requests for match predictions."""
    if not request.is_json:
        logger.warning("Request denied: Content-Type must be application/json")
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    logger.info(f"Received prediction request: {data}")

    required_keys = ['best_of', 'surface', 'tourney_level', 'round', 'player1_id', 'player2_id']
    if not all(key in data for key in required_keys):
        logger.warning(f"Prediction request failed: Missing required keys. Received: {data.keys()}")
        return jsonify({"error": f"Missing required keys: {required_keys}"}), 400

    try:
        prediction = prediction_service.generate_match_prediction(data)
        return jsonify(prediction), 200

    except ValueError as e:
        logger.warning(f"Value error during prediction: {e}")
        if "Player data not found" in str(e):
             return jsonify({"error": str(e)}), 404
        else:
             return jsonify({"error": f"Invalid input or data for prediction: {e}"}), 400
    except KeyError as e:
        logger.warning(f"Key error during prediction: {e}")
        return jsonify({"error": f"Missing necessary data for prediction: {e}"}), 400
    except ConnectionError as e:
        logger.error(f"Database connection error processing request: {e}")
        return jsonify({"error": "Database connection error"}), 503
    except FileNotFoundError as e:
        logger.error(f"Model file error processing request: {e}")
        return jsonify({"error": "Prediction model not available"}), 503
    except RuntimeError as e:
        logger.error(f"Runtime error during prediction processing: {e}", exc_info=True)
        return jsonify({"error": f"Internal server error: {e}"}), 500
    except Exception as e:
        logger.error(f"Unexpected error processing prediction request: {e}", exc_info=True)
        return jsonify({"error": "An unexpected internal server error occurred"}), 500

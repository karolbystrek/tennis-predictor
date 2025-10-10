import logging
from ..repositories import tennis_repository
from ..features import feature_engineer
from ..models.predictor import Predictor
from ..validators.prediction_validator import validate_prediction_request, ValidationError

logger = logging.getLogger(__name__)

def generate_match_prediction(request_data: dict) -> dict:
    """
    Orchestrates fetching data, preparing features, and getting prediction.

    Args:
        request_data: Validated data from the API request.

    Returns:
        A dictionary containing the prediction result.
        Raises exceptions on errors (e.g., DataNotFoundError, FeatureError, RuntimeError).
    """
    try:
        validate_prediction_request(request_data)
    except ValidationError as e:
        logger.warning(f"Validation error in prediction service: {e}")
        raise ValueError(f"Invalid request data: {e}")

    player1_id = request_data['player1_id']
    player2_id = request_data['player2_id']

    if player1_id == player2_id:
        logger.warning("Player IDs must be different.")
        raise ValueError("Player IDs must be different.")

    logger.info(f"Generating prediction for match P1:{player1_id} vs P2:{player2_id}")

    try:
        player1_db_data = tennis_repository.find_player_data_by_id(player1_id)
        player2_db_data = tennis_repository.find_player_data_by_id(player2_id)
    except ConnectionError as e:
        logger.error(f"Database connection error during prediction service: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected repository error: {e}", exc_info=True)
        raise RuntimeError("Failed to fetch data for prediction.") from e

    if player1_db_data is None or player2_db_data is None:
        missing_ids = [p_id for p_id, data in [(player1_id, player1_db_data), (player2_id, player2_db_data)] if data is None]
        logger.warning(f"Player data not found for IDs: {missing_ids}")
        raise ValueError(f"Player data not found for IDs: {missing_ids}")

    try:
        features_df = feature_engineer.prepare_features(request_data, player1_db_data, player2_db_data)
    except (KeyError, ValueError) as e:
        logger.warning(f"Feature preparation failed: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected feature engineering error: {e}", exc_info=True)
        raise RuntimeError("Feature preparation failed.") from e

    try:
        prediction_probability = Predictor.predict(features_df)
    except RuntimeError as e:
         logger.error(f"Prediction runtime error: {e}")
         raise
    except Exception as e:
         logger.error(f"Unexpected error calling predictor: {e}", exc_info=True)
         raise RuntimeError("Unexpected prediction error") from e

    confidence = abs(prediction_probability - 0.5) * 2

    player1_name = f"{player1_db_data.get('first_name', '')} {player1_db_data.get('last_name', '')}".strip()
    player2_name = f"{player2_db_data.get('first_name', '')} {player2_db_data.get('last_name', '')}".strip()

    winner_id = player1_id if prediction_probability > 0.5 else player2_id
    winner_name = player1_name if prediction_probability > 0.5 else player2_name

    prediction_result = {
        "player1Name": player1_name,
        "player2Name": player2_name,
        "player1WinProbability": float(round(prediction_probability, 2)),
        "player2WinProbability": float(round(1 - prediction_probability, 2)),
        "winnerName": winner_name,
        "winnerId": winner_id,
        "confidence": confidence,
    }

    logger.info(f"Prediction generated successfully: {prediction_result}")
    return prediction_result

import pandas as pd
import logging

logger = logging.getLogger(__name__)

EXPECTED_FEATURE_ORDER =[
    'best_of', 'ht_diff', 'age_diff', 'rank_diff',
    'rank_points_diff', 'elo_diff', 'surface_elo_diff', 'surface_Carpet',
    'surface_Clay', 'surface_Grass', 'surface_Hard', 'tourney_level_A',
    'tourney_level_D', 'tourney_level_F', 'tourney_level_G',
    'tourney_level_M', 'tourney_level_O', 'round_BR', 'round_ER', 'round_F',
    'round_QF', 'round_R128', 'round_R16', 'round_R32', 'round_R64',
    'round_RR', 'round_SF', 'p1_hand_A', 'p1_hand_L', 'p1_hand_R',
    'p1_hand_U', 'p2_hand_A', 'p2_hand_L', 'p2_hand_R', 'p2_hand_U'
]

def get_expected_feature_order() -> list[str]:
    """Returns the list of feature names in the exact order the model expects."""
    logger.debug(f"Using feature order: {EXPECTED_FEATURE_ORDER}")
    return EXPECTED_FEATURE_ORDER

def prepare_features(request_data: dict, player1_db_data: dict, player2_db_data: dict) -> pd.DataFrame:
    """
    Combines request data and database data into a feature DataFrame.

    Args:
        request_data: Data from the POST request.
        player1_db_data: Data fetched from DB for player 1.
        player2_db_data: Data fetched from DB for player 2.

    Returns:
        pd.DataFrame: A single-row DataFrame ready for model prediction.
        Raises ValueError/KeyError on missing data, FeatureError on other issues.
    """
    try:
        def safe_diff(p1_val, p2_val, feature_name, default=0):
            """Safely compute difference between two potentially missing values"""
            if p1_val is None and p2_val is None:
                logger.warning(f"Both values for {feature_name} are missing. Using default {default}.")
                return default
            elif p1_val is None:
                logger.warning(f"First player value for {feature_name} is missing. Using default of second player value.")
                return default
            elif p2_val is None:
                logger.warning(f"Second player value for {feature_name} is missing. Using default of first player value.")
                return default
            return p1_val - p2_val

        feature_dict = {
            'best_of': request_data.get('best_of', 3),

            'ht_diff': safe_diff(
                player1_db_data.get('ht'),
                player2_db_data.get('ht'),
                'height'
            ),
            'age_diff': safe_diff(
                player1_db_data.get('age'),
                player2_db_data.get('age'),
                'age'
            ),
            'rank_diff': safe_diff(
                player1_db_data.get('rank'),
                player2_db_data.get('rank'),
                'rank'
            ),
            'rank_points_diff': safe_diff(
                player1_db_data.get('rank_points'),
                player2_db_data.get('rank_points'),
                'rank_points'
            ),
            'elo_diff': safe_diff(
                player1_db_data.get('elo'),
                player2_db_data.get('elo'),
                'elo',
                default=0
            ),
            'surface_elo_diff': safe_diff(
                player1_db_data.get('surface_elo'),
                player2_db_data.get('surface_elo'),
                'surface_elo',
                default=0
            ),

            'surface_Carpet': 1 if request_data.get('surface') == 'Carpet' else 0,
            'surface_Clay': 1 if request_data.get('surface') == 'Clay' else 0,
            'surface_Grass': 1 if request_data.get('surface') == 'Grass' else 0,
            'surface_Hard': 1 if request_data.get('surface') == 'Hard' else 0,

            'tourney_level_A': 1 if request_data.get('tourney_level') == 'A' else 0,
            'tourney_level_D': 1 if request_data.get('tourney_level') == 'D' else 0,
            'tourney_level_F': 1 if request_data.get('tourney_level') == 'F' else 0,
            'tourney_level_G': 1 if request_data.get('tourney_level') == 'G' else 0,
            'tourney_level_M': 1 if request_data.get('tourney_level') == 'M' else 0,
            'tourney_level_O': 1 if request_data.get('tourney_level') == 'O' else 0,

            'round_BR': 1 if request_data.get('round') == 'BR' else 0,
            'round_ER': 1 if request_data.get('round') == 'ER' else 0,
            'round_F': 1 if request_data.get('round') == 'F' else 0,
            'round_QF': 1 if request_data.get('round') == 'QF' else 0,
            'round_R128': 1 if request_data.get('round') == 'R128' else 0,
            'round_R16': 1 if request_data.get('round') == 'R16' else 0,
            'round_R32': 1 if request_data.get('round') == 'R32' else 0,
            'round_R64': 1 if request_data.get('round') == 'R64' else 0,
            'round_RR': 1 if request_data.get('round') == 'RR' else 0,
            'round_SF': 1 if request_data.get('round') == 'SF' else 0,

            'p1_hand_A': 1 if player1_db_data.get('hand') == 'A' else 0,
            'p1_hand_L': 1 if player1_db_data.get('hand') == 'L' else 0,
            'p1_hand_R': 1 if player1_db_data.get('hand') == 'R' else 0,
            'p1_hand_U': 1 if player1_db_data.get('hand') == 'U' else 0,

            'p2_hand_A': 1 if player2_db_data.get('hand') == 'A' else 0,
            'p2_hand_L': 1 if player2_db_data.get('hand') == 'L' else 0,
            'p2_hand_R': 1 if player2_db_data.get('hand') == 'R' else 0,
            'p2_hand_U': 1 if player2_db_data.get('hand') == 'U' else 0,
        }

        for key, value in feature_dict.items():
            if value is None and key in EXPECTED_FEATURE_ORDER:
                logger.warning(f"Feature '{key}' is None after calculations. Imputing with 0.")
                feature_dict[key] = 0

        features_df = pd.DataFrame([feature_dict])
        try:
             features_df = features_df[EXPECTED_FEATURE_ORDER]
        except KeyError as e:
             logger.error(f"Missing expected feature column after preparation: {e}")
             raise KeyError(f"Prepared data is missing expected feature: {e}") from e

        if features_df.isnull().values.any():
            logger.error(f"NaN values detected in final feature DataFrame: \n{features_df}")
            raise ValueError("NaN values present in features after preparation.")

        logger.info("Feature DataFrame prepared successfully.")
        return features_df

    except KeyError as e:
        logger.error(f"Missing expected key during feature preparation: {e}")
        raise KeyError(f"Missing data needed for feature engineering: {e}") from e
    except Exception as e:
        logger.error(f"Unexpected error during feature preparation: {e}", exc_info=True)
        raise RuntimeError(f"Feature preparation failed: {e}") from e

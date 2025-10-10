import xgboost as xgb
import pandas as pd
import os
import logging
from flask import current_app

logger = logging.getLogger(__name__)

class Predictor:
    """Handles loading the XGBoost model and making predictions."""
    _model = None

    @classmethod
    def load_model(cls):
        """Loads the XGBoost model from the path specified in config."""
        if cls._model is None:
            model_path = current_app.config.get('MODEL_PATH')
            if model_path and os.path.exists(model_path):
                try:
                    logger.info(f"Loading model from: {model_path}")
                    cls._model = xgb.Booster()
                    cls._model.load_model(model_path)
                    logger.info("XGBoost model loaded successfully.")
                    try:
                        logger.info(f"Model expected feature names: {cls._model.feature_names}")
                    except AttributeError:
                        logger.warning("Could not get feature names from model. Ensure feature order is correct.")
                except xgb.core.XGBoostError as e:
                    logger.error(f"XGBoost error loading model from {model_path}: {e}", exc_info=True)
                    cls._model = None
                    raise RuntimeError(f"Failed to load XGBoost model: {e}") from e
                except Exception as e:
                    logger.error(f"Unexpected error loading model: {e}", exc_info=True)
                    cls._model = None
                    raise RuntimeError(f"Unexpected error loading model: {e}") from e
            else:
                logger.error(f"Model file not found at path: {model_path}")
                cls._model = None
                raise FileNotFoundError(f"Model file not found: {model_path}")
        else:
            logger.debug("Model already loaded.")

    @classmethod
    def predict(cls, features_df: pd.DataFrame) -> float:
        """
        Makes a prediction using the loaded model.

        Args:
            features_df: Pandas DataFrame with features matching the model's expectations.

        Returns:
            float: The prediction result (e.g., probability).
            Raises RuntimeError if model is not loaded or prediction fails.
        """
        if cls._model is None:
            logger.error("Prediction attempt failed: Model is not loaded.")
            raise RuntimeError("Model is not available for prediction.")

        try:
            feature_names_list = features_df.columns.tolist()
            dmatrix = xgb.DMatrix(features_df, feature_names=feature_names_list)

            prediction_raw = cls._model.predict(dmatrix)
            logger.debug(f"Raw prediction output: {prediction_raw}")

            if isinstance(prediction_raw, (list, tuple, pd.Series, pd.DataFrame)):
                 pred_value = prediction_raw[0]
            else:
                 pred_value = prediction_raw

            return float(pred_value)

        except xgb.core.XGBoostError as e:
            logger.error(f"XGBoost prediction error: {e}", exc_info=True)
            raise RuntimeError("XGBoost prediction failed") from e
        except Exception as e:
            logger.error(f"Unexpected error during prediction: {e}", exc_info=True)
            raise RuntimeError("Unexpected prediction error") from e

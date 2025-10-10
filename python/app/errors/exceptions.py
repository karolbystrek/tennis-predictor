class DataNotFoundError(Exception):
    """Custom exception for when data is not found in the repository."""
    pass

class FeatureError(ValueError):
    """Custom exception for errors during feature engineering."""
    pass

class PredictionError(RuntimeError):
    """Custom exception for errors during model prediction."""
    pass


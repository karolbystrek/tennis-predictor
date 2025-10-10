"""
Validator module for prediction-related data validation.
"""

class ValidationError(Exception):
    """Exception raised for validation errors."""
    pass

def validate_prediction_request(data):
    """
    Validates the prediction request data.

    Args:
        data: Dictionary containing the request data.

    Returns:
        Validated data if successful.

    Raises:
        ValidationError: If validation fails.
    """
    errors = []

    if not isinstance(data, dict):
        raise ValidationError("Request data must be a dictionary")

    required_fields = ['player1_id', 'player2_id', 'surface', 'tourney_level', 'round', 'best_of']
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")

    for player_field in ['player1_id', 'player2_id']:
        if player_field in data:
            if not isinstance(data[player_field], int):
                errors.append(f"{player_field} must be an integer")

    if 'player1_id' in data and 'player2_id' in data and data['player1_id'] == data['player2_id']:
        errors.append("player1_id and player2_id must be different")

    if 'surface' in data:
        valid_surfaces = ['Clay', 'Grass', 'Hard', 'Carpet']
        if data['surface'] not in valid_surfaces:
            errors.append(f"surface must be one of {valid_surfaces}")

    if 'tourney_level' in data:
        valid_levels = ['A', 'M', 'G', 'D', 'F', 'O']
        if data['tourney_level'] not in valid_levels:
            errors.append(f"tourney_level must be one of {valid_levels}")

    if 'best_of' in data:
        if not isinstance(data['best_of'], int):
            errors.append("best_of must be an integer")
        else:
            valid_best_of = [3, 5]
            if data['best_of'] not in valid_best_of:
                errors.append(f"best_of must be one of {valid_best_of}")

    if 'round' in data:
        valid_rounds = ['BR', 'ER', 'F', 'QF', 'R128', 'R16', 'R32', 'R64', 'RR', 'SF']
        if data['round'] not in valid_rounds:
            errors.append(f"round must be one of {valid_rounds}")

    if errors:
        raise ValidationError(", ".join(errors))

    return data

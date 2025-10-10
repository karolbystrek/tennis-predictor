import pandas as pd

def encode_categorical_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Encodes specified categorical features using One-Hot Encoding.
    """
    df_out = df.copy()

    categorical_cols = [
        'surface', 'tourney_level', 'round', 'p1_hand', 'p2_hand'
    ]
    cols_to_encode = [col for col in categorical_cols if col in df_out.columns]

    if cols_to_encode:
        df_out = pd.get_dummies(df_out, columns=cols_to_encode, drop_first=False)

    return df_out

import pandas as pd


def create_difference_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Calculates difference features between player 1 and player 2 stats
    and drops the original paired columns.
    """
    df_out = df.copy()
    df_out["ht_diff"] = df_out["p1_ht"] - df_out["p2_ht"]
    df_out["age_diff"] = df_out["p1_age"] - df_out["p2_age"]
    df_out["rank_diff"] = df_out["p1_rank"] - df_out["p2_rank"]
    df_out["rank_points_diff"] = df_out["p1_rank_points"] - df_out["p2_rank_points"]
    df_out["elo_diff"] = df_out["p1_elo"] - df_out["p2_elo"]
    df_out["surface_elo_diff"] = df_out["p1_surface_elo"] - df_out["p2_surface_elo"]

    cols_to_drop_post_eng = [
        "p1_ht",
        "p2_ht",
        "p1_age",
        "p2_age",
        "p1_rank",
        "p2_rank",
        "p1_rank_points",
        "p2_rank_points",
        "p1_elo",
        "p2_elo",
        "p1_surface_elo",
        "p2_surface_elo",
    ]

    cols_exist = [col for col in cols_to_drop_post_eng if col in df_out.columns]
    df_out.drop(columns=cols_exist, inplace=True)

    return df_out

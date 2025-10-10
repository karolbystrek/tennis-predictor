import pandas as pd
import math
import numpy as np

MATCHES_PATH = 'data/matches/matches.parquet'
PLAYERS_PATH = 'data/players/atp_players.csv'
DEFAULT_ELO = 1500
K_FACTOR = 32

def calculate_expected_score(rating1, rating2):
    return 1 / (1 + math.pow(10, (rating2 - rating1) / 400))

df = pd.read_parquet(MATCHES_PATH)

df['tourney_date'] = pd.to_datetime(df['tourney_date'], format='%Y%m%d')
df = df.sort_values(by=['tourney_date', 'match_num'], ascending=True).reset_index(drop=True)

unique_surfaces = df['surface'].dropna().unique()

player_elos = {}
player_surface_elos = {}

player_ranks = {}
player_rank_points = {}

winner_elo_before = []
loser_elo_before = []
winner_surface_elo_before = []
loser_surface_elo_before = []

for row in df.itertuples():
    winner_id = row.winner_id
    loser_id = row.loser_id
    surface = row.surface

    winner_current_elo = player_elos.get(winner_id, DEFAULT_ELO)
    loser_current_elo = player_elos.get(loser_id, DEFAULT_ELO)

    winner_current_surface_elo = player_surface_elos.get((winner_id, surface), DEFAULT_ELO)
    loser_current_surface_elo = player_surface_elos.get((loser_id, surface), DEFAULT_ELO)

    winner_elo_before.append(winner_current_elo)
    loser_elo_before.append(loser_current_elo)
    winner_surface_elo_before.append(winner_current_surface_elo)
    loser_surface_elo_before.append(loser_current_surface_elo)

    expected_winner = calculate_expected_score(winner_current_elo, loser_current_elo)
    expected_loser = 1 - expected_winner

    new_winner_elo = winner_current_elo + K_FACTOR * (1 - expected_winner)
    new_loser_elo = loser_current_elo + K_FACTOR * (0 - expected_loser)

    expected_winner_surface = calculate_expected_score(winner_current_surface_elo, loser_current_surface_elo)
    expected_loser_surface = 1 - expected_winner_surface

    new_winner_surface_elo = winner_current_surface_elo + K_FACTOR * (1 - expected_winner_surface)
    new_loser_surface_elo = loser_current_surface_elo + K_FACTOR * (0 - expected_loser_surface)

    player_elos[winner_id] = new_winner_elo
    player_elos[loser_id] = new_loser_elo
    player_surface_elos[(winner_id, surface)] = new_winner_surface_elo
    player_surface_elos[(loser_id, surface)] = new_loser_surface_elo

    if pd.notna(row.winner_rank):
        player_ranks[winner_id] = row.winner_rank
    if pd.notna(row.winner_rank_points):
        player_rank_points[winner_id] = row.winner_rank_points

    if pd.notna(row.loser_rank):
        player_ranks[loser_id] = row.loser_rank
    if pd.notna(row.loser_rank_points):
        player_rank_points[loser_id] = row.loser_rank_points

df['winner_elo'] = winner_elo_before
df['loser_elo'] = loser_elo_before
df['winner_surface_elo'] = winner_surface_elo_before
df['loser_surface_elo'] = loser_surface_elo_before

print(df.head())

df.to_csv('data/matches/matches.csv', index=False)

df_players = pd.read_csv(PLAYERS_PATH)

df_players.drop(columns=['wikidata_id'], inplace=True)

df_players['height'] = pd.to_numeric(df_players['height'], errors='coerce')
median_player_height = df_players['height'].median()
df_players['height'].fillna(median_player_height, inplace=True)
df_players['height'] = df_players['height'].astype('Int64')

df_players['dob_dt'] = pd.to_datetime(df_players['dob'], format='%Y%m%d', errors='coerce')
df_players.dropna(subset=['dob_dt'], inplace=True)
reference_date = pd.Timestamp('2025-04-16')
age_in_days = (reference_date - df_players['dob_dt']).dt.days
df_players['age'] = age_in_days / 365.25
age_numeric = pd.to_numeric(df_players['age'], errors='coerce')
inf_count = np.isinf(age_numeric).sum()
if inf_count > 0:
    print(f'  Found {inf_count} infinite values in age. Replacing with NaN.')
    age_numeric.replace([np.inf, -np.inf], np.nan, inplace=True)
int_age_col = pd.Series(pd.NA, index=age_numeric.index, dtype='Int64')
mask = age_numeric.notna()
int_age_col.loc[mask] = age_numeric.loc[mask].astype(int)
df_players['age'] = int_age_col
df_players['dob'] = df_players['dob_dt'].dt.strftime('%Y-%m-%d')
df_players.drop(columns=['dob_dt'], inplace=True)


df_players['rank'] = df_players['player_id'].map(player_ranks).fillna(np.nan)
df_players['rank_points'] = df_players['player_id'].map(player_rank_points).fillna(np.nan)
df_players['elo'] = df_players['player_id'].map(player_elos).fillna(np.nan)

for surface in unique_surfaces:
    if pd.isna(surface):
        continue
    surface_col_name = f'elo_{str(surface.lower())}'
    surface_elo_map = {player_id: elo for (player_id, surf), elo in player_surface_elos.items() if surf == surface}
    df_players[surface_col_name] = df_players['player_id'].map(surface_elo_map).fillna(np.nan)



cols_to_convert_to_int64 = ['rank', 'rank_points', 'elo'] + \
                           [f'elo_{str(s.lower())}' for s in unique_surfaces if pd.notna(s)]

problematic_column_found = None
stop_execution = False

for col in cols_to_convert_to_int64:
    if stop_execution:
        break

    if col in df_players.columns:
        try:
            numeric_col = pd.to_numeric(df_players[col], errors='coerce')
            nans_after_coerce = numeric_col.isna().sum()
            inf_count = np.isinf(numeric_col).sum()
            if inf_count > 0:
                numeric_col.replace([np.inf, -np.inf], np.nan, inplace=True)
            int_col = pd.Series(pd.NA, index=numeric_col.index, dtype='Int64')

            mask = numeric_col.notna()
            int_col.loc[mask] = numeric_col.loc[mask].astype(int)

            df_players[col] = int_col

        except Exception as e:
            problematic_column_found = col
            stop_execution = True
    else:
        print(f"Column {col} not found in DataFrame, skipping conversion.")

cols_to_keep = list(df_players.columns)
df_players_final = df_players[cols_to_keep]
df_players_final.to_csv('data/players/players.csv', index=False, encoding='utf-8')

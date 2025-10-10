import logging

import mysql
from .database import get_db

logger = logging.getLogger(__name__)

def find_player_data_by_id(player_id: int) -> dict | None:
    """
    Fetches required player data from the database by player ID.

    Args:
        player_id: The ID of the player.

    Returns:
        A dictionary containing player data, or None if not found.
        Raises ConnectionError if DB connection fails.
    """
    db = get_db()
    cursor = None
    try:
        cursor = db.cursor(dictionary=True)

        query = """
            SELECT
                *
            FROM
                players
            WHERE
                player_id = %s
        """

        cursor.execute(query, (player_id,))
        player_data = cursor.fetchone()

        if player_data:
            logger.debug(f"Data found for player ID: {player_id}")
            return player_data
        else:
            logger.warning(f"No data found in DB for player ID: {player_id}")
            return None

    except mysql.connector.Error as err:
        logger.error(f"DB error fetching data for player ID {player_id}: {err}")
        raise
    finally:
        if cursor:
            cursor.close()

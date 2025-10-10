# Tennis Match Outcome Prediction API

## Overview

This project provides a RESTful API service for predicting the outcome of professional tennis matches. It utilizes a machine learning model (XGBoost) trained on historical match and player data to estimate the win probability for each player in a given match scenario.

## Features

* Predicts the winner and win probability for a tennis match based on input features.
* Requires API key authentication for secure access.
* Configurable environments (Development, Production) via environment variables.
* Uses a MySQL database for retrieving player statistics.

## Technology Stack

* **Backend:** Python 3.x
* **Framework:** Flask
* **WSGI Server:** Gunicorn
* **Machine Learning:** XGBoost
* **Data Handling:** Pandas
* **Database:** MySQL (via `mysql-connector-python`)
* **Environment Management:** `python-dotenv`

## Setup and Installation

### Prerequisites

* Python 3.8+
* MySQL Server
* Git

### Installation Steps

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd tennis-predictor-api
    ```

2. **Create and activate a virtual environment:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate
    # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Database Setup:**
    * Ensure your MySQL server is running.
    * Create a database (e.g., `tennis`).
    * Create the necessary tables (e.g., a `players` table) and populate them with relevant player data. The required player data includes `player_id`, `ht`, `age`, `rank`, `rank_points`, `elo`, `surface_elo`, `hand`, `first_name`, `last_name`. *Note: Database schema and data loading scripts are not included in this repository.*

5. **Environment Variables:**
    * Create a `.env` file in the project root directory by copying the example or creating a new one.
    * Populate the `.env` file with your configuration. **Do not commit this file to version control.**

    ```text
    # .env file contents

    # Environment: 'dev' or 'prod'
    APP_ENV=dev

    # Flask Secret Key (generate a strong random key)
    SECRET_KEY=your_strong_secret_key_here

    # API Key for endpoint authentication
    PREDICTION_API_KEY=your_secure_api_key_here

    # Database Connection Details
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=tennis # Or your database name

    # Path to the trained XGBoost model file
    MODEL_PATH=data/models/xgboost_tennis_model.ubj

    # Logging Level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    LOG_LEVEL=INFO
    ```

6. **Machine Learning Model:**
    * Ensure the pre-trained XGBoost model file (`xgboost_tennis_model.ubj`) is placed in the location specified by the `MODEL_PATH` environment variable (default: `data/models/`). *Note: Model training scripts are not included in this repository.*

## Running the Application

Use Gunicorn (a production-grade WSGI server) to run the application. The application configuration (`dev` or `prod`) is determined by the `APP_ENV` variable in your `.env` file or system environment.

```bash
# Example: Run listening on localhost port 5000
gunicorn -b 127.0.0.1:5000 run:app
```

The server will start, loading the configuration specified by `APP_ENV`.

## API Endpoint

### Predict Match Outcome

* **URL:** `/predict`
* **Method:** `POST`
* **Authentication:** Requires `X-API-KEY` header matching the `PREDICTION_API_KEY` environment variable.
* **Request Body:** JSON object containing match details.

    **Example Request:**

    ```json
    {
        "player1_id": 104745, // Example ID for Player 1
        "player2_id": 104925, // Example ID for Player 2
        "surface": "Hard",    // "Hard", "Clay", "Grass", "Carpet"
        "tourney_level": "M", // "A", "M", "G", "D", "F", "O"
        "round": "F",         // "F", "SF", "QF", "R16", "R32", "R64", "R128", "RR", "BR", "ER"
        "best_of": 5          // 3 or 5
    }
    ```

* **Success Response (200 OK):**

    ```json
    {
        "player1Name": "Novak Djokovic",
        "player2Name": "Rafael Nadal",
        "player1WinProbability": 0.62,
        "player2WinProbability": 0.38,
        "winnerName": "Novak Djokovic",
        "winnerId": 104745,
        "confidence": 0.24 // Calculated as abs(probability - 0.5) * 2
    }
    ```

* **Error Responses:**
  * `400 Bad Request`: Invalid or missing data in the request body.
  * `403 Forbidden`: Missing or invalid `X-API-KEY` header.
  * `404 Not Found`: Player data not found in the database for one or both IDs.
  * `415 Unsupported Media Type`: Request body is not JSON.
  * `500 Internal Server Error`: Unexpected server error during processing.
  * `503 Service Unavailable`: Database connection error or model file not found/loadable.

## Configuration

Application configuration is managed via environment variables and the `app/config.py` file.

* `Config`: Base configuration class, reads from environment variables.
* `DevelopmentConfig`: Inherits from `Config`, sets `DEBUG = True`.
* `ProductionConfig`: Inherits from `Config`, sets `DEBUG = False`.

The active configuration is selected based on the `APP_ENV` environment variable (`dev` or `prod`). Critical settings (`PREDICTION_API_KEY`, `DB_USER`, `DB_PASSWORD`) are validated at startup when `APP_ENV=prod`.

## Project Structure

```plain
├── app/                  # Main application package
│   ├── __init__.py       # Application factory
│   ├── config.py         # Configuration classes
│   ├── errors/           # Custom exceptions
│   ├── features/         # Feature engineering logic
│   ├── models/           # ML model loading and prediction logic
│   ├── repositories/     # Database interaction logic
│   ├── routes/           # API endpoint definitions (Blueprints)
│   ├── services/         # Business logic orchestration
│   ├── utils/            # Utility functions (e.g., decorators)
│   └── validators/       # Request data validation
├── data/                 # Data files (e.g., models)
│   └── models/
│       └── xgboost_tennis_model.ubj # Example model file
├── .env                  # Local environment variables
├── .gitignore            # Git ignore rules
├── LICENSE               # Project license file
├── README.md             # This file
├── requirements.txt      # Python package dependencies
└── run.py                # Application entry point for Gunicorn
```

## Data Source and License Notice

**Important:** The historical ATP tour data used to train the machine learning model in this project originates from Jeff Sackmann's `tennis_atp` repository:

* **Repository:** [https://github.com/JeffSackmann/tennis_atp](https://github.com/JeffSackmann/tennis_atp)
* **Author:** Jeff Sackmann / Tennis Abstract
* **License:** [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**Usage Restrictions:** In accordance with the CC BY-NC-SA 4.0 license:

1. **Attribution is required:** Credit must be given to Jeff Sackmann / Tennis Abstract.
2. **Non-Commercial Use Only:** The underlying data from this source **cannot** be used for commercial purposes. Any use of this API or its derivatives must comply with this restriction regarding the data.
3. **ShareAlike:** If you adapt or build upon the data, you must distribute your contributions under the same license.

Please ensure your use of this API respects these license terms, particularly the non-commercial restriction tied to the dataset.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.

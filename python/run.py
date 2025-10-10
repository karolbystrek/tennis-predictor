import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    print(f" * Loading environment variables from: {dotenv_path}")
    load_dotenv(dotenv_path)
else:
    print(" * .env file not found, relying on system environment variables.")

from app import create_app

app = create_app()

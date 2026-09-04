import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "safedarshan-default-secret-key-2026")
    DEFAULT_MYSQL_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:password@localhost:3306/safedarshan")
    
    # Try MySQL URL; if MySQL environment is not active, fallback to sqlite:///safedarshan.db for zero-setup run
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///safedarshan.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:5173")


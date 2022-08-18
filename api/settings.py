from datetime import timedelta


class Settings:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///../test.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'
    SECRET_KEY = 'supermegasecret'
    CORS = {r"*": {"origins": "*"}}
    JWT_SECRET_KEY = "onemoremegasecret"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    # JWT_AUTH_URL_RULE = "/api/v1/users/login/"
    # JWT_AUTH_ENDPOINT = "login"
    # JWT_AUTH_USERNAME_KEY = "email"
    # JWT_AUTH_PASSWORD_KEY = "password"

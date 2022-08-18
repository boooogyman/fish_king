import bcrypt
from flask_jwt_extended import JWTManager

from api.db import db
from api.models import User


def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode(), bcrypt.gensalt())


def check_password(plain_text_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(plain_text_password.encode(), hashed_password)


def authenticate(email, password):
    user = User.query.filter(User.email == email).first()

    if not user:
        return None

    if user and check_password(password, user.password):
        return user


def identity(payload):
    user_id = payload['identity']
    return User.query.get(User.id == user_id)


def create_user(user_data):
    user = User(**user_data)
    user.password = get_hashed_password(user_data['password'])
    db.session.add(user)
    db.session.commit()

    return user


def init_auth(flask_app):
    JWTManager(flask_app)


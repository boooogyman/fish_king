from api.models import User


def get_user_by_email(email):
    return User.query.filter(User.email == email).one()

from flask import Blueprint

from . import views

users_urls = Blueprint('/users', __name__, url_prefix="/users")


users_urls.add_url_rule(
    '/sign-in/', "create user", views.create_user, methods=['POST'],
)
users_urls.add_url_rule(
    '/login/', "login", views.login, methods=['POST']
)


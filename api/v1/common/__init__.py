from flask import Blueprint

from . import views

common_urls = Blueprint('/common', __name__, url_prefix="/common")


common_urls.add_url_rule(
    '/init-data/', "get-init-data", views.get_init_data, methods=['GET'],
)


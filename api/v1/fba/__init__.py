from flask import Blueprint
from . import views

fba_urls = Blueprint('/fba', __name__, url_prefix="/fba")

fba_urls.add_url_rule(
    '/', "create fba", views.create_fba_view, methods=['POST']
)

fba_urls.add_url_rule(
    '/update/<sample_id>/', "update fba", views.update_fba_view, methods=['PUT']
)

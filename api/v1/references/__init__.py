from flask import Blueprint

from . import views

references_urls = Blueprint('/references', __name__, url_prefix="/references")


references_urls.add_url_rule(
    '/', "create reference", views.create_reference_view, methods=['POST'],
)

references_urls.add_url_rule(
    '/search/<term>/', "search reference", views.search_reference_view, methods=['GET']
)

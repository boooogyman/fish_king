from flask import Blueprint

from . import views

places_urls = Blueprint('/places', __name__, url_prefix="/places")


places_urls.add_url_rule(
    '/', "create place", views.create_place_view, methods=['POST']
)

places_urls.add_url_rule(
    '/my-list/', "get my places", views.get_my_places_view, methods=['GET']
)

places_urls.add_url_rule(
    '/list/', "get places", views.get_places_view, methods=['GET']
)

places_urls.add_url_rule(
    '/<place_id>/', "get place", views.get_place_view, methods=['GET']
)

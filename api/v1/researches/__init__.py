from flask import Blueprint

from . import views

researches_urls = Blueprint('/researches', __name__, url_prefix="/researches")

researches_urls.add_url_rule(
    '/', "create research", views.create_research_view, methods=['POST']
)

researches_urls.add_url_rule(
    '/indicator/', "create indicator", views.create_indicator_view, methods=['POST']
)

researches_urls.add_url_rule(
    '/indicator/update/<indicator_id>', "update indicator", views.update_indicator_view, methods=['POST']
)

researches_urls.add_url_rule(
    '/update/<research_id>/', "update research", views.update_research_view, methods=['PUT']
)

researches_urls.add_url_rule(
    '/my-list/', "get my places", views.get_my_places_view, methods=['GET']
)

researches_urls.add_url_rule(
    '/list/', "get places", views.get_places_view, methods=['GET']
)

researches_urls.add_url_rule(
    '/<research_id>/', "get research", views.get_research_view, methods=['GET']
)

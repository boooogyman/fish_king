from flask import Blueprint
from . import views

sample_structure_urls = Blueprint('/sample-structure', __name__, url_prefix="/sample-structure")

sample_structure_urls.add_url_rule(
    '/<research_id>/', "create sample", views.create_sample_view, methods=['POST']
)

sample_structure_urls.add_url_rule(
    '/update/<sample_id>/', "update sample", views.update_sample_view, methods=['PUT']
)

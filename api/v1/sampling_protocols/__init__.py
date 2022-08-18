from flask import Blueprint

from . import views

sampling_protocols_urls = Blueprint('/sampling-protocol', __name__, url_prefix="/sampling-protocols")


sampling_protocols_urls.add_url_rule(
    '/', "create sampling_protocol", views.create_sampling_protocol_view, methods=['POST']
)

sampling_protocols_urls.add_url_rule(
    '/my-list/', "get my sampling_protocols", views.get_my_sampling_protocols_view, methods=['GET']
)

sampling_protocols_urls.add_url_rule(
    '/list/', "get sampling_protocols", views.get_sampling_protocols_view, methods=['GET']
)

sampling_protocols_urls.add_url_rule(
    '/<sampling_protocol_id>/', "get sampling_protocol", views.get_sampling_protocols_view, methods=['GET']
)

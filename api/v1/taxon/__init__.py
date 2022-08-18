from flask import Blueprint

from . import views

taxon_urls = Blueprint('/taxon', __name__, url_prefix="/taxon")


taxon_urls.add_url_rule(
    '/kingdoms/', "get kingdoms", views.get_kingdoms_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/phyla/<kingdom_id>/', "get phyla", views.get_phyla_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/class-names/<phylum_id>/', "get class-names", views.get_class_names_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/orders/<class_name_id>/', "get orders", views.get_orders_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/families/<order_id>/', "get families", views.get_families_view, methods=['GET']
)


taxon_urls.add_url_rule(
    '/genera/<family_id>/', "get genera", views.get_genera_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/taxa/<genera_id>/', "get taxa", views.get_taxa_view, methods=['GET']
)

taxon_urls.add_url_rule(
    '/search/<term>/', "search taxa", views.search_taxon, methods=['GET']
)

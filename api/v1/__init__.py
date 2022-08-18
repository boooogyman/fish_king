from flask import Blueprint

from . import views
from .fba import fba_urls
from .places import places_urls
from .references import references_urls
from .researches import researches_urls
from .sample_structure import sample_structure_urls
from .taxon import taxon_urls
from .users import users_urls
from .common import common_urls
from .sampling_protocols import sampling_protocols_urls

api_v1 = Blueprint('api/v1', __name__, url_prefix="api/v1")
api_v1.register_blueprint(places_urls)
api_v1.register_blueprint(users_urls)
api_v1.register_blueprint(common_urls)
api_v1.register_blueprint(sampling_protocols_urls)
api_v1.register_blueprint(researches_urls)
api_v1.register_blueprint(taxon_urls)
api_v1.register_blueprint(sample_structure_urls)
api_v1.register_blueprint(references_urls)
api_v1.register_blueprint(fba_urls)

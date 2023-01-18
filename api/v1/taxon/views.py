from flask import jsonify, make_response, request
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required

from api.models import Taxon
from api.v1.taxon.schemas import KingdomDataSchema, PhylumDataSchema, ClassNameDataSchema, FamilyDataSchema, \
    GenusDataSchema, TaxonDataSchema, OrdrDataSchema, create_taxon_schema
from api.v1.taxon.services import search_taxa, create_taxon


@jwt_required()
def get_kingdoms_view():
    kingdoms = Taxon.query.filter(Taxon.rank == 'kingdom')

    return make_response(jsonify(KingdomDataSchema().dump(kingdoms, many=True)), 200)


@jwt_required()
def get_phyla_view(kingdom_id):
    phyla = Taxon.query.filter(
        Taxon.rank == 'phylum',
        Taxon.parent_id == kingdom_id
    )

    return make_response(jsonify(PhylumDataSchema().dump(phyla, many=True)), 200)


@jwt_required()
def get_class_names_view(phylum_id):
    phyla = Taxon.query.filter(
        Taxon.rank == 'class',
        Taxon.parent_id == phylum_id
    )

    return make_response(jsonify(ClassNameDataSchema().dump(phyla, many=True)), 200)


@jwt_required()
def get_orders_view(class_name_id):
    orders = Taxon.query.filter(
        Taxon.rank == 'order',
        Taxon.parent_id == class_name_id
    )

    return make_response(jsonify(OrdrDataSchema().dump(orders, many=True)), 200)


@jwt_required()
def get_families_view(order_id):
    families = Taxon.query.filter(
        Taxon.rank == 'family',
        Taxon.parent_id == order_id
    )

    return make_response(jsonify(FamilyDataSchema().dump(families, many=True)), 200)


@jwt_required()
def get_genera_view(family_id):
    genera = Taxon.query.filter(
        Taxon.rank == 'genus',
        Taxon.parent_id == family_id
    )

    return make_response(jsonify(GenusDataSchema().dump(genera, many=True)), 200)


@jwt_required()
def get_taxa_view(genera_id):
    taxa = Taxon.query.filter(
        Taxon.rank == 'species',
        Taxon.parent_id == genera_id
    )

    return make_response(jsonify(TaxonDataSchema().dump(taxa, many=True)), 200)


@jwt_required()
def search_taxon(term):
    taxa = search_taxa(term)

    return make_response(jsonify(TaxonDataSchema().dump(taxa, many=True)), 200)


@jwt_required()
@expects_json(create_taxon_schema)
def create_taxon_view():
    data = request.json
    sample = create_taxon(data)
    return make_response(jsonify(TaxonDataSchema().dump(sample, many=False)), 200)

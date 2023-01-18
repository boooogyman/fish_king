from flask import request, make_response, jsonify
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.v1.common.constants import get_indicator_type_by_id
from api.v1.researches.schemas import create_research_schema, ResearchDataSchema, create_indicator_schema, \
    IndicatorDataSchema
from api.v1.researches.services import get_research, create_research, get_researches, update_research, create_indicator, \
    update_indicator, get_my_research
from api.v1.users.services import get_user_by_email


@jwt_required()
@expects_json(create_research_schema)
def create_research_view():
    data = request.json
    research = create_research(data)
    return make_response(jsonify(ResearchDataSchema().dump(research, many=False)), 200)


def get_place_view(place_id):
    pass


@jwt_required()
def get_my_places_view():
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)
    # places = places.get_my_places(user)
    researches = get_researches()
    return make_response(jsonify(ResearchDataSchema().dump(researches, many=True)), 200)


@jwt_required()
def get_places_view():
    places = get_researches()

    return make_response(jsonify(ResearchDataSchema().dump(places, many=True)), 200)


@jwt_required()
def get_research_view(research_id=None):
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)
    research = get_research(research_id, owner_id=user.id)
    return make_response(jsonify(ResearchDataSchema().dump(research, many=False)), 200)


@jwt_required()
def update_research_view(research_id=None):
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)

    data = request.json
    update_research(research_id, data)
    research = get_research(research_id, owner_id=user.id)
    return make_response(jsonify(ResearchDataSchema().dump(research, many=False)), 200)


@jwt_required()
@expects_json(create_indicator_schema)
def create_indicator_view():
    data = request.json
    indicator = create_indicator(data)
    indicator.type = get_indicator_type_by_id(indicator.type_id)

    return make_response(jsonify(IndicatorDataSchema().dump(indicator, many=False)), 200)


@jwt_required()
@expects_json(create_indicator_schema)
def update_indicator_view(indicator_id=None):
    data = request.json
    update_indicator(indicator_id, data)

    return make_response(jsonify({"status": "ok"}), 200)


@jwt_required()
def get_my_researches_view():
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)
    research = get_my_research(owner_id=user.id)
    return make_response(jsonify(ResearchDataSchema().dump(research, many=True)), 200)

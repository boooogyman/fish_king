from flask import request, make_response, jsonify
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.v1.conditions.schemas import create_indicator_schema, create_conditions_schema, ConditionsDataSchema
from api.v1.places.schemas import PlaceDataSchema
from api.v1.places.services import create_place, get_places
from api.v1.users.services import get_user_by_email


def get_place_view(place_id):
    pass


@jwt_required()
def get_my_places_view():
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)
    # places = places.get_my_places(user)
    places = get_places()
    return make_response(jsonify(PlaceDataSchema().dump(places, many=True)), 200)


@jwt_required()
def get_places_view():
    places = get_places()

    return make_response(jsonify(PlaceDataSchema().dump(places, many=True)), 200)

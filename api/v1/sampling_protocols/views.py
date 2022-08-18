from flask import request, make_response, jsonify
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.v1.sampling_protocols.schemas import create_sampling_protocol_schema, SamplingProtocolDataSchema
from api.v1.sampling_protocols.services import create_sampling_protocol, get_sampling_protocols
from api.v1.users.services import get_user_by_email


@expects_json(create_sampling_protocol_schema)
def create_sampling_protocol_view():
    place_data = request.json
    place = create_sampling_protocol(place_data)
    return make_response(jsonify(SamplingProtocolDataSchema().dump(place, many=False)), 200)


def get_sampling_protocol_view(protocol_id):
    pass


@jwt_required()
def get_my_sampling_protocols_view():
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)
    # places = places.get_my_places(user)
    sampling_protocols = get_sampling_protocols()
    return make_response(jsonify(SamplingProtocolDataSchema().dump(sampling_protocols, many=True)), 200)


@jwt_required()
def get_sampling_protocols_view():
    sampling_protocols = get_sampling_protocols()

    return make_response(jsonify(SamplingProtocolDataSchema().dump(sampling_protocols, many=True)), 200)

from flask import jsonify, make_response, request
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required

from .schemas import create_reference_schema, ReferenceDataSchema
from .services import create_reference, search_reference


@expects_json(create_reference_schema)
def create_reference_view():
    data = request.json
    obj = create_reference(data)
    return make_response(jsonify(ReferenceDataSchema().dump(obj)), 200)


@jwt_required()
def search_reference_view(term):
    references = search_reference(term)

    return make_response(jsonify(ReferenceDataSchema().dump(references, many=True)), 200)


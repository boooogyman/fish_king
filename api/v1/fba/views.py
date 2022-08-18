from flask import request, make_response, jsonify
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required

from api.v1.fba.schemas import create_fba_schema, FBADataSchema
from api.v1.fba.services import create_fba, update_fba


@jwt_required()
@expects_json(create_fba_schema)
def create_fba_view():
    data = request.json
    research = create_fba(data)
    return make_response(jsonify(FBADataSchema().dump(research, many=False)), 200)


@jwt_required()
# @expects_json(update_fba_schema)
def update_fba_view(fba_id=None):
    data = request.json
    update_fba(fba_id, data)

    return make_response(jsonify({"status": "ok"}), 200)

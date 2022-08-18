from flask import request, make_response, jsonify
from flask_jwt_extended import jwt_required

from api.v1.sample_structure.schemas import SampleDataSchema
from api.v1.sample_structure.services import create_sample, update_sample


@jwt_required()
def create_sample_view(research_id=None):
    research = create_sample({"research_id": research_id})
    return make_response(jsonify(SampleDataSchema().dump(research, many=False)), 200)


@jwt_required()
# @expects_json(update_sample_schema)
def update_sample_view(sample_id=None):
    data = request.json
    update_sample(sample_id, data)

    return make_response(jsonify({"status": "ok"}), 200)

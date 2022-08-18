from flask import jsonify, make_response, request
from flask_expects_json import expects_json
from flask_jwt_extended import create_access_token

from .schemas import create_user_schema, login_schema, LoginDataSchema
from ...common import auth
from ...common.auth import authenticate


@expects_json(create_user_schema)
def create_user():
    user_data = request.json
    auth.create_user(user_data)
    return make_response(jsonify({"status": "ok"}), 200)


def get_login_data(user, jwt):
    data = {
        'jwt': jwt,
        'user': user
    }
    return_data = LoginDataSchema().dump(data, many=False)
    return return_data


def get_wrong_login_data():
    return {
        "error": "wrong login data"
    }


@expects_json(login_schema)
def login():
    user_data = request.json
    user = authenticate(
        user_data['email'],
        user_data['password']
    )
    if not user:
        return make_response(jsonify(get_wrong_login_data()), 404)

    return make_response(
        jsonify(
            get_login_data(user, create_access_token(identity=user.email))
        ),
        200
    )

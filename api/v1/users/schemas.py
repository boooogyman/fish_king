from marshmallow import Schema, fields

create_user_schema = {
  "type": "object",
  "properties": {
    "email": {"type": "string"},
    "phone": {"type": "string"},
    "first_name": {"type": "string"},
    "last_name": {"type": "string"},
    "password": {"type": "string"},
  },
  "required": ["phone", "email", "first_name", "last_name", "password"]
}


login_schema = {
  "type": "object",
  "properties": {
    "email": {"type": "string"},
    "password": {"type": "string"},
  },
  "required": ["email", "password"]
}


class LoginUserSchema(Schema):
    id = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()


class LoginDataSchema(Schema):
    user = fields.Nested(LoginUserSchema())
    jwt = fields.Str()

from marshmallow import Schema, fields


class UserInitDataSchema(Schema):
    id = fields.Str()
    first_name = fields.Str(data_key="firstName")
    last_name = fields.Str(data_key="lastName")

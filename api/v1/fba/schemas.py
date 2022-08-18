from marshmallow import fields, Schema

create_fba_schema = {
  "type": "object",
  "properties": {
    "sample_id": {"type": "string"},
  },
}

update_fba_schema = {
  "type": "object",
  "properties": {
    "l_capital": {"type": "string"},
    "l_lowercase": {"type": "string"},
    "m_capital": {"type": "string"},
    "m_lowercase": {"type": "string"},
    "gender": {"type": "string"},
    "z_capital": {"type": "string"},
    "age": {"type": "string"},
    "eggs_count": {"type": "string"},
    "food": {"type": "string"},
  },
}


class FBADataSchema(Schema):
    id = fields.Str(default="")
    l_capital = fields.Str(default="")
    l_lowercase = fields.Str(default="")
    m_capital = fields.Str(default="")
    m_lowercase = fields.Str(default="")
    gender = fields.Str(default="")
    z_capital = fields.Str(default="")
    age = fields.Str(default="")
    eggs_count = fields.Str(default="")
    food = fields.Str(default="")



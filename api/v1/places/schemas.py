from marshmallow import fields, Schema

create_place_schema = {
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "lon": {"type": "string"},
    "lat": {"type": "string"},
    "town_id": {"type": "string"},
    "creator_id": {"type": "string"},
  },
  "required": ["name", "lon", "lat", "town_id", "creator_id"]
}


class PlaceDataSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    town_id = fields.Str()
    lat = fields.Int()
    lon = fields.Int()
    creator_id = fields.Int()

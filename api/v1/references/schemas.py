from marshmallow import Schema, fields


create_reference_schema = {
  "type": "object",
  "properties": {
    "bibliography": {"type": "string"},
    "doi": {"type": "string"},
    "url": {"type": "string"},
  },
  "required": ["bibliography", "doi", "url"]
}


class ReferenceDataSchema(Schema):
    id = fields.Str()
    bibliography = fields.Str()
    doi = fields.Str()
    url = fields.Str()

from marshmallow import fields, Schema


create_sampling_protocol_schema = {
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "device_name": {"type": "string"},
    "device_description": {"type": "string"},
    "sample_size_value": {"type": "string"},
    "sample_size_unit": {"type": "string"},
    "creator_id": {"type": "string"},
  },
  "required": [
      "name",
      "device_name",
      "device_description",
      "sample_size_value",
      "sample_size_unit",
      "creator_id"
  ]
}


class SamplingProtocolDataSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    device_name = fields.Str()
    device_description = fields.Str()
    sample_size_value = fields.Str()
    sample_size_unit = fields.Str()
    creator_id = fields.Str()
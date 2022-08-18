from marshmallow import fields, Schema

from api.v1.places.schemas import PlaceDataSchema
from api.v1.sample_structure.schemas import SampleDataSchema
from api.v1.sampling_protocols.schemas import SamplingProtocolDataSchema

create_research_schema = {
  "type": "object",
  "properties": {
    "owner_id": {"type": "string"},
    "realm_id": {"type": "string"},
  },
  "required": ["owner_id", "realm_id"]
}


create_indicator_schema = {
  "type": "object",
  "properties": {
    "type_id": {"type": "string"},
    "value": {"type": "string"},
    "conditions_id": {"type": "string"},
  },
  "required": ["type_id", "value", "research_id"]
}


class IndicatorTypeDataSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    unit = fields.Str()
    realm = fields.Str()


class IndicatorDataSchema(Schema):
    id = fields.Str()
    value = fields.Str()
    type = fields.Nested(IndicatorTypeDataSchema())


class RealmDataSchema(Schema):
    id = fields.Str()


class ResearchDataSchema(Schema):
    id = fields.Str()
    owner_id = fields.Str()
    place = fields.Nested(PlaceDataSchema(), default={})
    sampling_protocol = fields.Nested(
        SamplingProtocolDataSchema(), default={}, data_key="samplingProtocol"
    )
    indicators = fields.Nested(IndicatorDataSchema(), many=True, default=[])
    samples = fields.Nested(SampleDataSchema(), many=True, default=[])
    realm = fields.Nested(RealmDataSchema(), many=False)


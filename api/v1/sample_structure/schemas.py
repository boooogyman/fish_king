from marshmallow import fields, Schema

from api.v1.fba.schemas import FBADataSchema
from api.v1.references.schemas import ReferenceDataSchema
from api.v1.taxon.schemas import TaxonDataSchema

update_sample_schema = {
  "type": "object",
  "properties": {
    "mass": {"type": "string"},
    "count": {"type": "string"},
    "bibliography": {"type": "string"},
    "doi": {"type": "string"},
    "url": {"type": "string"},
  },
}


class SampleDataSchema(Schema):
    id = fields.Str(default="")
    taxon = fields.Nested(TaxonDataSchema(), many=False, data_key="taxon")
    mass = fields.Str(default="")
    count = fields.Str(default="")
    reference = fields.Nested(ReferenceDataSchema(), default={})
    fbas = fields.Nested(FBADataSchema(), many=True, default=[])
    population = fields.Str(default="")


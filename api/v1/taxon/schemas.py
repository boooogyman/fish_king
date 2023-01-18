from marshmallow import fields, Schema


create_taxon_schema = {
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "kingdom": {"type": "string"},
    "phylum": {"type": "string"},
    "class_name": {"type": "string"},
    "family": {"type": "string"},
    "scientific_name_ukraine": {"type": "string"},
    "parent_id": {"type": "string"},
    "rank": {"type": "string"},
    "researcher_id": {"type": "string"},
    "col_id": {"type": "string"},
  },
}


class KingdomDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class PhylumDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class ClassNameDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class OrdrDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class FamilyDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class GenusDataSchema(Schema):
    col_id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')


class TaxonDataSchema(Schema):
    id = fields.Str(data_key='id')
    scientific_name = fields.Str(data_key='name')
    kingdom = fields.Str()
    phylum = fields.Str()
    class_name = fields.Str(data_key='className')
    family = fields.Str()
    scientific_name_ukraine = fields.Str(data_key='scientificNameUkraine')
    parent_id = fields.Str(data_key='parentId')
    rank = fields.Str(data_key='rank')
    col_id = fields.Str(data_key='colId')
    researcher_id = fields.Str(data_key='researcherId')

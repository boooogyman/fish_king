from marshmallow import fields, Schema


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
    col_id = fields.Str()
    scientific_name = fields.Str(data_key='name')

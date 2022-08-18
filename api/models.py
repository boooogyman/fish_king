import datetime

from api.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    user_domain = db.Column(db.Integer, db.ForeignKey('user_domain.id'))


class UserDomain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)


class County(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))


class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    county_id = db.Column(db.Integer, db.ForeignKey('county.id'))


class Town(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))


class Realm(db.Model):
    """field of research biology, ichtio"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)


class Waterbody(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('waterbody.id'))


class Conservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    shape = db.Column(db.JSON(), nullable=False)


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lon = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Integer, nullable=False)
    town_id = db.Column(db.Integer, db.ForeignKey('town.id'))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    waterbody_id = db.Column(db.Integer, db.ForeignKey('waterbody.id'))
    conservation1_id = db.Column(db.Integer, db.ForeignKey('conservation.id'), nullable=True)
    conservation2_id = db.Column(db.Integer, db.ForeignKey('conservation.id'), nullable=True)
    conservation3_id = db.Column(db.Integer, db.ForeignKey('conservation.id'), nullable=True)
    conservation4_id = db.Column(db.Integer, db.ForeignKey('conservation.id'), nullable=True)

    biotop = db.Column(db.String(120), nullable=True)


class Research(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'))
    sampling_protocol_id = db.Column(db.Integer, db.ForeignKey('sampling_protocol.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    sample_producer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    realm_id = db.Column(db.Integer)

    datetime = db.Column(db.DateTime, nullable=True, default=datetime.datetime(1960, 1, 1))

    def __repr__(self):
        return '<Research %r>' % self.id


class SamplingProtocol(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)
    device_name = db.Column(db.String(120), nullable=False)
    device_description = db.Column(db.String(120), nullable=False)
    sample_size_value = db.Column(db.String(120), nullable=False)
    sample_size_unit = db.Column(db.String(120), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Reference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bibliography = db.Column(db.String(1020), nullable=True)
    doi = db.Column(db.String(1020), nullable=True)
    url = db.Column(db.String(1020), nullable=True)


class Indicator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    research_id = db.Column(db.Integer, db.ForeignKey('research.id'))
    type_id = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Integer, nullable=False)


class IndicatorTypes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer, db.ForeignKey('research.id'))
    units = db.Column(db.Integer, nullable=False)
    realm = db.Column(db.Integer, nullable=False)


class FBA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sample_id = db.Column(db.Integer, db.ForeignKey('sample_structure.id'))
    l_capital = db.Column(db.Integer, nullable=True)
    l_lowercase = db.Column(db.Integer, nullable=True)
    m_capital = db.Column(db.Integer, nullable=True)
    m_lowercase = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(120), nullable=True)
    z_capital = db.Column(db.String(120), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    eggs_count = db.Column(db.Integer, nullable=True)
    food = db.Column(db.Integer, nullable=True)


class SampleStructure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    research_id = db.Column(db.Integer, db.ForeignKey('research.id'))
    taxon_id = db.Column(db.Integer, db.ForeignKey('taxon.id'))
    count = db.Column(db.Integer, default="")
    mass = db.Column(db.Integer, default="")
    mass_unit = db.Column(db.String(120), default="")
    count_unit = db.Column(db.String(120), default="")
    reference_id = db.Column(db.Integer, db.ForeignKey('reference.id'))
    population = db.Column(db.String(120), default="")


class Taxon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kingdom = db.Column(db.String(120), nullable=True)
    phylum = db.Column(db.String(120), nullable=True)
    class_name = db.Column(db.String(120), nullable=True)
    family = db.Column(db.String(120), nullable=True)
    scientific_name = db.Column(db.String(120), nullable=True)
    scientific_name_ukraine = db.Column(db.String(120), nullable=True)
    parent_id = db.Column(db.String(120), nullable=True)
    rank = db.Column(db.String(120), nullable=True)
    col_id = db.Column(db.String(120), nullable=True)
    researcher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

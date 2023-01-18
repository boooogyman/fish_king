from api.db import db
from api.models import Place, Research, SamplingProtocol, Indicator, SampleStructure, Reference, Taxon, FBA
from api.v1.common.constants import get_indicator_type_by_id

class Realm:
    def __init__(self, realm_id):
        self.id = realm_id


realms = {
    "BIBLIO": Realm("BIBLIO"),
    "REAL": Realm("REAL")
}


def create_research(data):
    research = Research(**data)
    db.session.add(research)
    db.session.commit()
    db.session.refresh(research)
    return research


def create_indicator(data):
    indicator = Indicator(**data)
    db.session.add(indicator)
    db.session.commit()
    db.session.refresh(indicator)
    return indicator


def update_indicator(indicator_id, data):
    indicator = Indicator.query.filter(Indicator.id == indicator_id).update(data)

    db.session.commit()
    return indicator


def update_research(research_id, data):
    change_names = {
        "place": "place_id",
        "samplingProtocol": "sampling_protocol_id",
    }
    change = {}

    for k, v in data.items():
        change[change_names[k]] = v['id']

    research_query = Research.query.filter(Research.id == research_id)
    research_query.update(change)
    db.session.commit()


def get_researches(limit=100, offset=0):
    return Place.query.limit(limit).offset(offset)


def update_research_with_related_objects(research):
    research.place = research.place_id and Place.query.get(research.place_id) or {}
    research.sampling_protocol = research.sampling_protocol_id and SamplingProtocol.query.get(
        research.sampling_protocol_id) or {}
    research.indicators = Indicator.query.filter(Indicator.research_id == research.id).all()
    research.samples = SampleStructure.query.filter(SampleStructure.research_id == research.id).all()

    for sample in research.samples:
        if sample.reference_id:
            sample.reference = Reference.query.get(sample.reference_id)

        if sample.taxon_id:
            sample.taxon = Taxon.query.get(sample.taxon_id)

        sample.fbas = FBA.query.filter(FBA.sample_id == sample.id).all()

    research.realm = realms[research.realm_id]

    for indicator in research.indicators:
        indicator.type = get_indicator_type_by_id(indicator.type_id)


def get_research(research_id, owner_id):
    research = Research.query.filter(
        Research.id == research_id,
        Research.owner_id == owner_id
    ).one()

    update_research_with_related_objects(research)

    return research


def get_my_research(owner_id):
    researches = list(Research.query.filter(
        Research.owner_id == owner_id
    ))

    for research in researches:
        update_research_with_related_objects(research)

    return researches

from api.db import db
from api.models import SampleStructure, FBA


def create_sample(data):
    sample = SampleStructure(**data)
    db.session.add(sample)
    db.session.commit()
    db.session.refresh(sample)
    fba = FBA(**{"sample_id": sample.id})
    db.session.add(fba)
    db.session.commit()
    db.session.refresh(fba)
    sample.fbas = [fba]
    return sample


def update_sample(sample_id, data):
    change_names = {
        "taxon": "taxon_id",
        "reference": "reference_id",
    }
    noop_names = ["fbas"]
    change = {}

    for k, v in data.items():
        if k in noop_names:
            continue

        if k in change_names:
            if isinstance(v, dict) and v:
                change[change_names[k]] = v['id']
        else:
            change[k] = v

    obj = SampleStructure.query.filter(
        SampleStructure.id == sample_id
    ).update(change)

    db.session.commit()
    return obj


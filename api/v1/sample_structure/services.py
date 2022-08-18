from api.db import db
from api.models import SampleStructure


def create_sample(data):
    obj = SampleStructure(**data)
    db.session.add(obj)
    db.session.commit()
    db.session.refresh(obj)
    return obj


def update_sample(sample_id, data):
    change_names = {
        "taxon": "taxon_id",
        "reference": "reference_id",
    }
    change = {}

    for k, v in data.items():
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


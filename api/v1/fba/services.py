from api.db import db
from api.models import FBA


def create_fba(data):
    obj = FBA(**data)
    db.session.add(obj)
    db.session.commit()
    db.session.refresh(obj)
    return obj


def update_fba(fba_id, change):
    obj = FBA.query.filter(
        FBA.id == fba_id
    ).update(change)

    db.session.commit()
    return obj


from api.db import db
from api.models import Reference


def create_reference(data):
    obj = Reference(**data)
    db.session.add(obj)
    db.session.commit()
    db.session.refresh(obj)
    return obj


def search_reference(term):
    references = Reference.query.filter(
        Reference.bibliography.regexp_match(f"(^{term}.*)|(.*%s{term}.*)", ["i"])
    ).limit(12).all()

    return references
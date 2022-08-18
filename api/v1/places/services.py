from api.db import db
from api.models import Place


def create_place(place_data):
    place = Place(**place_data)
    db.session.add(place)
    db.session.commit()
    db.session.refresh(place)
    return place


def get_my_places(user):
    return Place.query.filter().one()


def get_places(limit=100, offset=0):
    return Place.query.limit(limit).offset(offset)


from api.db import db
from api.models import Indicator


def create_indicator(indicator_data):
    indicator = Indicator(**indicator_data)
    db.session.add(indicator)
    db.session.commit()
    db.session.refresh(indicator)
    return indicator


def create_conditions(conditions_data):
    conditions = Conditions(**conditions_data)
    db.session.add(conditions)
    db.session.commit()
    db.session.refresh(conditions)
    return conditions

#
# def get_my_places(user):
#     return Place.query.filter().one()
#
#
# def get_places(limit=100, offset=0):
#     return Place.query.limit(limit).offset(offset)
#

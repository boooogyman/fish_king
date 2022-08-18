from api.db import db
from api.models import SamplingProtocol


def create_sampling_protocol(sampling_protocol_data):
    sampling_protocol = SamplingProtocol(**sampling_protocol_data)
    db.session.add(sampling_protocol)
    db.session.commit()
    db.session.refresh(sampling_protocol)
    return sampling_protocol


def get_my_sampling_protocols(user):
    return SamplingProtocol.query.filter().one()


def get_sampling_protocols(limit=100, offset=0):
    return SamplingProtocol.query.limit(limit).offset(offset)


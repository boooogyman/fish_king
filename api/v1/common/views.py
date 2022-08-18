from flask_jwt_extended import jwt_required, get_jwt_identity

from .constants import indicator_types
from .schemas import UserInitDataSchema
from ..users.services import get_user_by_email


@jwt_required()
def get_init_data():
    user_email = get_jwt_identity()
    user = get_user_by_email(user_email)

    return {
        'user': UserInitDataSchema().dump(user, many=False),
        'config': {
            'indicatorRealms': indicator_types,
        }
    }

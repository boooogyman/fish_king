from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from api import models
from api.db import db


class CreateUserAdminView(ModelView):
    def create_model(self, form):
        form['data']
        obj = super().create_model(form)
        obj
        return obj


def init_admin(flask_app):
    admin = Admin(flask_app, name='fish king', template_mode='bootstrap4')
    admin.add_view(CreateUserAdminView(models.User, db.session))
    admin.add_view(ModelView(models.UserDomain, db.session))

    admin.add_view(ModelView(models.Country, db.session))
    admin.add_view(ModelView(models.County, db.session))
    admin.add_view(ModelView(models.Region, db.session))
    admin.add_view(ModelView(models.Town, db.session))

    admin.add_view(ModelView(models.Conservation, db.session))
    admin.add_view(ModelView(models.Waterbody, db.session))

    admin.add_view(ModelView(models.Research, db.session))

    admin.add_view(ModelView(models.Taxon, db.session))

    admin.add_view(ModelView(models.Place, db.session))


    admin.add_view(ModelView(models.Realm, db.session))

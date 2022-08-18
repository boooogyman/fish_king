from flask import Flask, Blueprint
from flask_cors import CORS

from api.common.admin import init_admin
from api.common.auth import init_auth
from api.db import db, migrate
from api.v1 import api_v1
from api.v1.taxon.services import create_taxon


def create_app():
    flask_app = Flask(__name__)
    flask_app.config.from_object("settings.Settings")
    db.init_app(flask_app)
    root = Blueprint('root', __name__, url_prefix='/')

    root.register_blueprint(api_v1)

    flask_app.register_blueprint(root)

    init_admin(flask_app)
    init_auth(flask_app)
    CORS(flask_app, resources=flask_app.config['CORS'])
    migrate.init_app(flask_app, db)

    return flask_app


app = create_app()


@app.cli.command('initdb')
def initdb_command():
    db.create_all()
    from api.common.auth import create_user

    create_user(dict(email="1", password="1", first_name="Yev", last_name="1", phone="1"))
    from api.v1.researches.services import create_research
    from api.v1.places.services import create_place
    create_place(dict(name="Lviv", lat="1", lon="2", town_id="1"))
    from api.v1.sampling_protocols.services import create_sampling_protocol
    create_sampling_protocol(dict(name="SP1", creator_id=1, sample_size_unit="2", device_name="1", device_description="2", sample_size_value="1"))
    create_research(dict(owner_id=1, place_id=1, sampling_protocol_id=1, realm_id="REAL"))
    create_taxon(dict(
        kingdom="human",
        phylum="losser",
        class_name="fagot",
        family="nigga",
        scientific_name="white",
        scientific_name_ukraine="сніжок",
        parent_id="",
        rank="",
        col_id=""
    ))

    create_taxon(dict(
        kingdom="bird",
        phylum="cran",
        class_name="tula",
        family="bilks",
        scientific_name="rota",
        scientific_name_ukraine="лелека",
        parent_id="",
        rank="",
        col_id=""
    ))

    create_taxon(dict(
        kingdom="fish",
        phylum="fried",
        class_name="potato",
        family="cheese",
        scientific_name="shit",
        scientific_name_ukraine="окунь",
        parent_id="",
        rank="",
        col_id=""
    ))


@app.cli.command('importtaxon')
def import_taxon():
    import pandas as pd

    from api.models import Taxon

    filename = "/Users/evgenkorzhik/Downloads/854c2c06-d111-41ee-9410-95706b9edd4d/NameUsage.tsv"
    df = pd.read_csv(filename, sep='\t', nrows=100000)
    df = df.reset_index()  # make sure indexes pair with number of rows

    for index, row in df.iterrows():
        db.session.add(
            Taxon(
                kingdom=row['col:kingdom'],
                phylum=row['col:phylum'],
                class_name=row['col:class'],
                family=row['col:family'],
                scientific_name=row['col:scientificName'],
                scientific_name_ukraine="",
                parent_id=row['col:parentID'],
                rank=row['col:rank'],
                col_id=row['col:ID'],
                researcher_id=None,
            )
        )
        if index % 10000 == 1:
            print(index)
            db.session.commit()



if __name__ == '__main__':

    app.run(debug=True)


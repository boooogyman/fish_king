from api.db import db
from api.models import Taxon


def create_taxon(taxon_data):
    change_names = {
        "name": "scientific_name",
    }
    change = {}

    for k, v in taxon_data.items():
        if k in change_names:
            change[change_names[k]] = v
        else:
            change[k] = v

    taxon = Taxon(**change)
    db.session.add(taxon)
    db.session.commit()
    db.session.refresh(taxon)
    return taxon


def search_taxa(term):
    taxa = Taxon.query.filter(
        Taxon.col_id.regexp_match(f"(^{term}.*)|(.*%s{term}.*)", ["i"]) |
        Taxon.scientific_name.regexp_match(f"(^{term}.*)|(.*%s{term}.*)", ["i"]) |
        Taxon.scientific_name_ukraine.regexp_match(f"(^{term}.*)|(.*%s{term}.*)", ["i"])        # |
    ).limit(12).all()

    return taxa

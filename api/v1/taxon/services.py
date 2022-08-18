from api.db import db
from api.models import Taxon


def create_taxon(taxon_data):
    taxon = Taxon(**taxon_data)
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

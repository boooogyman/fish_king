"""Initial migration.

Revision ID: 2506d231b17d
Revises: 8c8154096d3b
Create Date: 2022-08-17 23:48:39.484442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2506d231b17d'
down_revision = '8c8154096d3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('FBA',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sample_id', sa.Integer(), nullable=True),
    sa.Column('l_capital', sa.Integer(), nullable=True),
    sa.Column('l_lowercase', sa.Integer(), nullable=True),
    sa.Column('m_capital', sa.Integer(), nullable=True),
    sa.Column('m_lowercase', sa.Integer(), nullable=True),
    sa.Column('gender', sa.String(length=120), nullable=True),
    sa.Column('z_capital', sa.String(length=120), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('eggs_count', sa.Integer(), nullable=True),
    sa.Column('food', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sample_id'], ['sample_structure.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('FBA')
    # ### end Alembic commands ###
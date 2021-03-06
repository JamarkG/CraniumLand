"""empty message

Revision ID: aac1728312de
Revises: ffdc0a98111c
Create Date: 2021-04-26 10:43:01.709632

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aac1728312de'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('decks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('tag', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tag'], ['tags.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('deckid', sa.Integer(), nullable=True),
    sa.Column('answer', sa.String(length=255), nullable=False),
    sa.Column('question', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['deckid'], ['decks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cards')
    op.drop_table('decks')
    op.drop_table('tags')
    # ### end Alembic commands ###

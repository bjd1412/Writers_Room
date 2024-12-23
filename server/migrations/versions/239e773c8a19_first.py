"""first

Revision ID: 239e773c8a19
Revises: 
Create Date: 2024-10-27 03:35:11.034481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '239e773c8a19'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('story', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_stories'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users'))
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('story_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_comments_story_id_stories')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_comments'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('users')
    op.drop_table('stories')
    # ### end Alembic commands ###

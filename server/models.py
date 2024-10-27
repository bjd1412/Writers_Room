from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    comments = db.relationship("Comment", back_populates="user")
    stories = association_proxy("comments", "story", creator=lambda story_obj: Story(story=story_obj) )
    
    def __repr__(self):
        return f"<User: {self.id}, {self.username}"

class Story(db.Model, SerializerMixin):
    __tablename__="stories"

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    story = db.Column(db.String)

    comments = db.relationship("Comment", back_populates='story')
    user = association_proxy("comments", "user", creator=lambda user_obj: User(user=user_obj))

class Comment(db.Model, SerializerMixin):
    __tablename__="comments"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"))
    user = db.relationship("User", back_populates='comments')
    story = db.relationship("Story", back_populates="comments")

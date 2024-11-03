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

    serialize_rules = ("-comments.user",)


    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    stories = association_proxy("comments", "story", creator=lambda story_obj: Story(story=story_obj) )

    @validates("username")
    def validate_username(self, key, username):
        if username == User.query.filter(User.username==username).first():
            raise ValueError("Username already taken")
        elif len(username) < 3:
            return ValueError("Username must have at least 3 characters")
        else:
            return username

    @validates("password")
    def validate_password(self, key, password):
        if len(password) < 8:
            return ValueError("Password must have at least 8 characters.")
        else:
            return password


    
    def __repr__(self):
        return f"<User: {self.id}, {self.username}"

class Story(db.Model, SerializerMixin):
    __tablename__="stories"

    serialize_rules = ("-comments.story",)

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    title = db.Column(db.String)
    story = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    comments = db.relationship("Comment", back_populates='story', cascade="all, delete-orphan")
    user = association_proxy("comments", "user", creator=lambda user_obj: User(user=user_obj))

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            return ValueError("Your work must have a title")
        else:
            return title

    @validates("story")
    def validate_story(self, key, story):
        if not story:
            return ValueError("There is no work to submit")
        elif len(story) < 1:
            return ValueError("There is no work to submit")
        else:
            return story


class Comment(db.Model, SerializerMixin):
    __tablename__="comments"

    serialize_rules = ("-user.comments", "-story.comments",)

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"))

    user = db.relationship("User", back_populates='comments', cascade="all")
    story = db.relationship("Story", back_populates="comments", cascade="all")

    @validates("comment")
    def validate_comment(self, key, comment):
        if not comment:
            return ValueError("There is no comment to submit")
        else:
            return comment

#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import db, User, Story, Comment

# Remote library imports
from faker import Faker

# Local imports
import datetime
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Story.query.delete()
        Comment.query.delete()


        W3 = User(username="Wlyn113", password="Password1")
        J2 = User(username="JennaT2", password="Passwordsss")
        db.session.add_all([W3, J2])
        db.session.commit()

        s1 = Story(title="A Glimpse Of Us", image="https://cdnb.artstation.com/p/assets/images/images/008/448/553/large/ben-jelter-eternal-bond.jpg?1512851430", story="You know you can make it, but not alone, I’ve left quiet letters on the wall, hoping someday, you’ll see them all, and feel the truth—you're not alone.\n In my mind, I play back memories, a reel of you, time's gentle tease. If only you were here each day, to chase the loneliness away.\n This quiet ache, it steals my peace, I’m worn from wandering, seeking release. I’m tired of the darkness, tired of the cold—and all I want is a hand to hold.", created_at=datetime.datetime(2024, 1, 12), user_id=2)
        s2 = Story(title="Never Ending", image="https://static.vecteezy.com/system/resources/thumbnails/051/748/336/small_2x/david-and-bathsheba-are-captured-in-a-tranquil-garden-reflecting-on-their-past-lush-greenery-and-flowing-water-enhance-the-serene-atmosphere-of-this-biblical-moment-photo.jpeg", story="Gray clouds drift slowly,\nsilent tears fall without end,\nlost in autumn's hush.", created_at=datetime.datetime(2024, 4, 22), user_id=1)
        db.session.add_all([s1, s2])
        db.session.commit()

        c1 = Comment(comment="Great Poem!", created_at=datetime.datetime(2024, 2, 13), stories=s1, user=J2)
        c2 = Comment(comment="Good story", created_at=datetime.datetime(2024, 1, 15), stories=s2, user=W3)
        db.session.add_all([c1, c2])
        db.session.commit()


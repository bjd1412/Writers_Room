#!/usr/bin/env python3
from models import db, User, Story, Comment
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


api = Api(app)

CORS(app)


@app.route('/')
def index():
    return '<h1>Project Server</h1>'




class Users(Resource):

    def get(self):
        user = User.query.all()
        users = []
        for us in user:
            user_dict = us.to_dict(rules=("-comments",))
            users.append(user_dict)
        return make_response(users, 200)

    def post(self):
        data = request.form
        try:
            new_user = User(
            username=data["username"],
            password=data["password"]
            )
        except:
            return make_response({"Error": "Validation Error"})
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 200)


class User_ID(Resource):
    
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(rules=("-comments",)), 200)
        else:
            return make_response({"Error": "User not found"}, 404)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.form
        if user:
            try:
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                user_dict = user.to_dict(rules=("-comments"))
                return make_response(user_dict, 202)
            except:
                return make_response({"Error": "Validation Error"}, 400)
        else:
            return make_response({"Error": "User not found"}, 404)

    def delete(self, id):
        user = User.query.filter(User.id==id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "User not found"}, 404)



class Stories(Resource):

    def get(self):
        story = Story.query.all()
        stories = []
        for write in story:
            story_dict = write.to_dict(rules=("-comments",))
            stories.append(story_dict)
        return make_response(stories, 200)

    def post(self):
        data = request.form
        try:
            new_story = Story(
            image=data["image"],
            title=data["title"],
            story=data["story"]
            )
        except:
            return make_response({"Error": "Validation Error"}, 400)
        db.session.add(new_story)
        db.session.commit()
        return make_response(new_story.to_dict(), 200)


class Story_ID(Resource):
    
    def get(self, id):
        story = Story.query.filter(Story.id == id).first()
        if story:
            return make_response(story.to_dict(), 200)
        else:
            return make_response({"Error": "Story does not exist"}, 404)

    def patch(self, id):
        story = Story.query.filter(Story.id==id).first()
        data = request.form
        if data:
            try:
                for attr in data:
                    setattr(story, attr, data[attr])
                db.session.commit()
                return make_response(story.to_dict(), 202)
            except:
                return make_response({"Error": "Validation Error"}, 400)
        else:
            return make_response({"Error: Story does not exist"}, 404)

    def delete(self, id):
        story = Story.query.filter(Story.id == id).first()
        if story:
            db.session.delete(story)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Story does not exist"}, 404)
        


class Comments(Resource):
    def get(self):
        comment = Comment.query.all()
        comments = []
        for comm in comment:
            comm_dict = comm.to_dict(rules=("-story", "-user",))
            comments.append(comm_dict)
        return make_response(comments, 200)

    def post(self):
        data = request.form
        try:
            new_comment = Comment(
            comment=data["comment"]
            )
        except:
            return make_response({"Error": "Validation Error"}, 400)
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(), 200)


class Comment_ID(Resource):

    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if comment:
            return make_response(comment.to_dict(rules=("-story", "-user")), 200)
        else:
            return make_response({"Error": "Comment does not exist"})
    
    def patch(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        data = request.form
        if comment:
            try:
                for attr in data:
                    setattr(comment, attr, data[attr])
                db.session.commit()
                return make_response(comment.to_dict(), 200)
            
            except:
                return make_response({"Error": "Validation Error"}, 400)
        else:
            return make_response({"Error": "Comment does not exist"})

    def delete(self, id):
        comment = Comment.query.filter(Comment.id==id).first()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Comment does not exist"})




       



api.add_resource(Users, '/users')
api.add_resource(User_ID, '/users/<int:id>' )
api.add_resource(Story_ID, '/stories/<int:id>')
api.add_resource(Stories, '/stories')
api.add_resource(Comments, '/comments')
api.add_resource(Comment_ID, '/comments/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)


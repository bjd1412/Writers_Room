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

class Username(Resource):

    def get(self, username):
        username = User.query.filter(User.username==username).first()
        return make_response([user.to_dict() for user in username], 200)


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

class Login(Resource):

    def post(self):
        data = request.form["username"]
        user = User.query.filter(User.username==data).first()
        if user:
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"Error": "User not found"})



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
      comments = Comment.query.all()  
      return make_response([comment.to_dict() for comment in comments], 200)  
  
   def post(self):  
      data = request.form  
      try:  
        new_comment = Comment(comment=data["comment"], story_id=data["story_id"])  
      except:  
        return make_response({"Error": "Validation Error"}, 400)  
      db.session.add(new_comment)  
      db.session.commit()  
      return make_response(new_comment.to_dict(), 200)

      
  
class CommentResource(Resource):  
   def get(self, id):  
      comment = Comment.query.filter_by(id=id).first()  
      if comment:  
        return make_response(comment.to_dict(), 200)  
      else:  
        return make_response({"Error": "Comment not found"}, 404)  
  
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
        return make_response({"Error": "Comment not found"}, 404)  
  
   def delete(self, id):  
    comment = Comment.query.filter(Comment.id==id).first()  
    if comment:  
        db.session.delete(comment)  
        db.session.commit()  
        return make_response({"message": "Comment deleted successfully"}, 200)  
    else:  
        return make_response({"Error": "Comment not found"}, 404)  
  
class CommentsByStoryID(Resource):  
   def get(self, story_id):  
      comments = Comment.query.filter(Comment.story_id == story_id).all()  
      return make_response([comment.to_dict() for comment in comments], 200)  
  
api.add_resource(Users, '/users')  
api.add_resource(User_ID, '/users/<int:id>')
api.add_resource(Username, '/users/<string:username>') 
# api.add_resource(Login, '/login') 
api.add_resource(Story_ID, '/stories/<int:id>')  
api.add_resource(Stories, '/stories')  
api.add_resource(Comments, '/comments')  
api.add_resource(CommentResource, '/comments/<int:id>')  
api.add_resource(CommentsByStoryID, '/comments/by-story/<int:story_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


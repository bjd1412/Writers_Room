#!/usr/bin/env python3
from models import db, User, Story, Comment
from flask import Flask, session, request, make_response, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from extensions import bcrypt

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '1412'
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

bcrypt.init_app(app)

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
            user_dict = us.to_dict(rules=("-stories",))
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
        return make_response(new_user.to_dict(rules=("-stories",)), 200)

class Username(Resource):

    def get(self, username):
        if username and username != "null":
            user = User.query.filter(User.username==username).first()
            if user:
                return make_response(user.to_dict(), 200)
            else:
                return make_response({"Error": "User not found"}, 404)
        else:
            return make_response({"Error": "Invalid Username"}, 400)


class User_ID(Resource):
    
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(rules=("-stories",)), 200)
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
                user_dict = user.to_dict(rules=("-stories",))
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
        try:  
            data = request.form  
            username = data["username"]  
            password = data["password"]  
            user = User.query.filter(User.username==username).first()  
            if user and user.check_password(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(rules=("-stories",)), 200) 
            else:  
                return make_response({"Error": "Invalid username or password"}, 401)  
        except Exception as e:  
            print(e)   
            return make_response({"Error": str(e)}, 500)

class Logout(Resource):

    def delete(self):
        if 'user_id' in session:
            session['user_id'] = None 
            return make_response({'message': 'Successfully logged out'}, 204)
            
class CheckSession(Resource):


    def get(self):
        if 'user_id' in session:  
            user = db.session.get(User, session['user_id'])  
            if user:  
                return make_response(user.to_dict(), 200)  
            else:  
                return make_response({"Error": "User not found"}, 404)  
        else:  
            return make_response({"Error": "Not logged in"}, 401)
        

class Stories(Resource):

    def get(self):
        story = Story.query.all()    
        stories = []    
        for write in story:  
            story_dict = write.to_dict(rules=("-comments",))  
            if write.user:  
                story_dict["user"] = write.user.to_dict(rules=("-stories",))  
            stories.append(story_dict)    
        return make_response(stories, 200)
  
    def post(self):

        if 'user_id' not in session:   
            return make_response({"Error": "Not logged in"}, 401)   
        data = request.form   
        try:   
            new_story = Story(   
               image=data["image"],   
               title=data["title"],   
               story=data["story"],  
               user_id=session["user_id"]  
            )   
            db.session.add(new_story)   
            db.session.commit()   
            return make_response(new_story.to_dict(rules=("-comments",)), 200)   
        except Exception as e:
            print(e)   
            return make_response({"Error": str(e)}, 400)  
  
class Story_ID(Resource):  
    
    def get(self, id):
        story = Story.query.filter(Story.id == id).first()  
        if story:  
            story_dict = story.to_dict(rules=("-comments",))
            if story.user:
                story_dict["user"] = story.user.to_dict(rules=("-stories",))    
            return make_response(story_dict, 200)  
        else:  
            return make_response({"Error": "Story does not exist"}, 404)


    def patch(self, id):

        story = Story.query.filter(Story.id==id).first()  
        if story:  
            data = request.form  
            if data:
                try:
                    for attr in data:  
                        if attr == 'story' and not data[attr]:  
                            return make_response({"Error": "Story cannot be empty"}, 400)  
                        setattr(story, attr, data[attr])  
                    db.session.commit()  
                    return make_response(story.to_dict(rules=("-comments",)), 202)  
                except:  
                    return make_response({"Error": "Validation Error"}, 400)  
            else:  
                return make_response({"Error: No Data Provided"}, 400)  
        else:  
            return make_response({"Error": "Story Does Not Exist"}, 404)

    def delete(self, id):
        story = Story.query.filter(Story.id == id).first()
        if story:
            if "user_id" in session and story.user_id == session["user_id"]:
                db.session.delete(story)
                db.session.commit()
                return make_response({"message": "Story deleted successfully"}, 200)
            else:
                return make_response({"Error": "Not Authorized to delete this story"}, 401)
        else:
            return make_response({"Error": "Story does not exist"}, 404)
  
class StoriesByUser(Resource):
      
  
    def get(self, username):

        user = User.query.filter(User.username==username).first()  
        if user:  
            stories = Story.query.filter(Story.user_id==user.id).all()  
            return make_response([story.to_dict(rules=("-user","-comments")) for story in stories], 200)  
        else:  
            return make_response({"Error": "User not found"}, 404)  
  
class Comments(Resource):

    def get(self):    
        comments = Comment.query.all()    
        comments = [comment.to_dict(rules=("-story", "-user")) for comment in comments]  
        return make_response(comments, 200)  

    def post(self):  
        if 'user_id' not in session:  
            return make_response({"Error": "Not logged in"}, 401)  
        data = request.form   
        try:   
            new_comment = Comment(comment=data["comment"], story_id=data["story_id"], user_id=session['user_id'])
            db.session.add(new_comment)   
            db.session.commit()
            return make_response(new_comment.to_dict(rules=("-stories",)), 200)
        except:   
            return make_response({"Error": "Validation Error"}, 400)   
        

      
  
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
            if 'user_id' in session and comment.user_id == session['user_id']:  
                db.session.query(Comment).filter(Comment.id==id).delete()  
                db.session.commit()  
                return make_response({"message": "Comment deleted successfully"}, 200)  
            else:  
                return make_response({"Error": "Not Authorized to delete this comment"}, 401)  
        else:  
            return make_response({"Error": "Comment not found."}, 404)
  
class CommentsByStoryID(Resource):  
    def get(self, story_id):
        comments = Comment.query.filter(Comment.story_id == story_id).all()  
        return make_response([comment.to_dict() for comment in comments], 200)  
  
api.add_resource(Users, '/users')  
api.add_resource(User_ID, '/users/<int:id>')
api.add_resource(Username, '/users/<string:username>') 
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout') 
api.add_resource(Story_ID, '/stories/<int:id>')
api.add_resource(StoriesByUser, '/stories/by-user/<string:username>')  
api.add_resource(Stories, '/stories')  
api.add_resource(Comments, '/comments')  
api.add_resource(CommentResource, '/comments/<int:id>')  
api.add_resource(CommentsByStoryID, '/comments/by-story/<int:story_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


from flask import jsonify, current_app as app, send_from_directory, request
from project import db, Bcrypt as bcrypt, create_access_token
from project.models import User


@app.route('/')
def home():
    return jsonify(hello="world")


@app.route('/check_db')
def check_db():
    users = User.query.all()
    return jsonify({
        "user_count": len(users),
        "first_user": users[0].to_dict() if users else None
    })


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     new_user = User(email=data['email'], password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify(message='User created'), 201


# @app.route('/login', methods=['GET'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()
#     if user and bcrypt.check_password_hash(user.password, data['password']):
#         access_token = create_access_token(identity=user.id)
#         return jsonify(access_token=access_token), 200
#     return jsonify(message='Invalid credentials'), 401

    

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

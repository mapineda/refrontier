from flask import jsonify, current_app as app, send_from_directory
from project import db
from project.models import User


@app.route('/')
def hello_world():
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


@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

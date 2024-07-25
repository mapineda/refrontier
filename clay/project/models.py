# models.py
from . import db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    calculations = db.relationship('Calculation', backref='user', lazy=True)

    def __init__(self, email):
        self.email = email


    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email
        }


class Calculation(db.Model):
    __tablename__ = "calculations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    current_weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    activity_level = db.Column(db.String(50), nullable=False)
    goal_weight = db.Column(db.Float, nullable=False)
    goal_body_fat = db.Column(db.Float, nullable=False)
    weeks_to_goal = db.Column(db.Integer, nullable=False)
    bmi = db.Column(db.Float, nullable=False)
    body_fat_percentage = db.Column(db.Float, nullable=False)
    maintenance_calories = db.Column(db.Float, nullable=False)
    caloric_intake_to_goal = db.Column(db.Float, nullable=False)

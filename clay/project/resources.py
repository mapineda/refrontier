from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, User, Calculation
from sqlalchemy.exc import IntegrityError

resources_bp = Blueprint('resources', __name__)


@resources_bp.route('/')
def home():
    return jsonify(hello="world")


@resources_bp.route('/check_db')
def check_db():
    users = User.query.all()
    return jsonify({
        "user_count": len(users),
        "first_user": users[0].to_dict() if users else None
    })


@resources_bp.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@resources_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify(email=user.email, id=user.id), 200
    return jsonify(message="User not found"), 404


@resources_bp.route('/calculate', methods=['POST'])
# @jwt_required()
def calculate():
    data = request.get_json()
    print(data)
    current_weight = data.get('current_weight') # kg
    height = data.get('height') # cm
    age = data.get('age')
    gender = data.get('gender')
    activity_level = data.get('activity_level')

       # Convert to appropriate types
    try:
        current_weight = float(current_weight)
        height = float(height) / 100  # Convert cm to meters
        age = int(age)
    except ValueError:
        return jsonify({"error": "Invalid input types"}), 400
    
    # validate
    if not all([current_weight, height, age, gender, activity_level]):
        return jsonify(message="Missing required parameters"), 400

    # Example calculation for BMI
    bmi = current_weight / (height ** 2)
    brm = 0
    
   # Estimate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    if gender == 'male':
        bmr = 10 * current_weight + 6.25 * height * 100 + 5 * age + 5  # height converted back to cm
    else:
        bmr = 10 * current_weight + 6.25 * height * 100 - 5 * age - 161  # height converted back to cm
    
    activity_multiplier = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9
    }

    maintenance_calories = bmr * activity_multiplier.get(activity_level, 1.2)

    # Save calculation to the database
    # user_id = get_jwt_identity()
    # calculation = Calculation(
    #     user_id=user_id,
    #     current_weight=current_weight,
    #     goal_weight=goal_weight,
    #     height=height,
    #     age=age,
    #     gender=gender,
    #     activity_level=activity_level,
    #     bmi=bmi,
    #     maintenance_calories=maintenance_calories
    # )

    # try:
    #     db.session.add(calculation)
    #     db.session.commit()
    # except IntegrityError:
    #     db.session.rollback()
    #     return jsonify(message="Error saving calculation"), 500

    return jsonify(
        bmi=round(bmi),
        bmr=round(brm),
        maintenance_calories=maintenance_calories
    ), 200

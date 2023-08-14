from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Movie, Review, db
from app.forms import CreateReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint("reviews", __name__)

# Get all reviews for a specific movie
@review_routes.route("/movie/<int:movie_id>", methods=["GET"])
def get_reviews_for_movie(movie_id):
    """
    Query for all reviews for a specific movie and return them in a list of review dictionaries
    """
    reviews = Review.query.filter(Review.movie_id == movie_id).all()
    reviews_dict = [review.to_dict() for review in reviews]
    return jsonify(reviews_dict)

# Get a single review by id
@review_routes.route("/<int:id>", methods=["GET"])
def get_review_by_id(id):
    """
    Query for a review by id and return it in a dictionary
    """
    review = Review.query.get(id)
    return jsonify(review.to_dict())

# Create a review
@review_routes.route("/new", methods=["POST"])
@login_required
def create_new_review():
    form = CreateReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    form.data["user_id"] = current_user.id
    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            movie_id=form.data["movie_id"],
            rating=form.data["rating"],
            content=form.data["content"]
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Edit a review
@review_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    if review is None:
        return {"errors": "Review not found"}, 404

    form = CreateReviewForm()
    if form.validate_on_submit():
        new_rating = form.data["rating"]
        new_content = form.data["content"]

        review.rating = new_rating
        review.content = new_content
        db.session.commit()

        return review.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Delete a review
@review_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review is None:
        return {"errors": "Review not found"}, 404

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully Deleted"}

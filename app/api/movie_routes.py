from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Movie, Review, db  # Import your Movie and Review models
from app.api.auth_routes import validation_errors_to_error_messages

movie_routes = Blueprint('movies', __name__)

@movie_routes.route('')
def get_all_movies():
    """
    Query for all movies and returns them in a list of movie dictionaries
    """
    return jsonify([movie.to_dict() for movie in Movie.query.all()])

@movie_routes.route('/<int:id>')
def get_movie_by_id(id):
    """
    Query for a movie by id and returns that movie in a dictionary
    """
    movie = Movie.query.get(id)
    return jsonify(movie.to_dict())

@movie_routes.route('/current')
@login_required
def get_user_movies():
    """
    Query for all movies created by the current user and return them in a list of movie dictionaries
    """
    user_movies = Movie.query.filter(Movie.user_id == current_user.id)
    movies_dict = [movie.to_dict() for movie in user_movies]
    return jsonify(movies_dict)

# Deleting a Movie created by the user
@movie_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_movie(id):
    movie = Movie.query.get(id)

    if movie is None or movie.user_id != current_user.id:
        return {'errors': 'Movie not found'}, 404

    db.session.delete(movie)
    db.session.commit()

    return {'message': 'Successfully Deleted'}

# Creating a new Movie
@movie_routes.route('/newMovie', methods=['POST'])
@login_required
def create_new_movie():
    pass

# Editing a Movie a user already created
@movie_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_movie(id):
    pass

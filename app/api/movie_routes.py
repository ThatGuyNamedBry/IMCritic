from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Movie, Review, MovieActor, Actor, db
from app.forms import CreateMovieForm, EditMovieForm
from app.api.auth_routes import validation_errors_to_error_messages

movie_routes = Blueprint("movies", __name__)


@movie_routes.route("")
def get_all_movies():
    """
    Query for all movies and returns them in a list of movie dictionaries
    """
    return jsonify([movie.to_dict() for movie in Movie.query.all()])


@movie_routes.route("/<int:id>")
def get_movie_by_id(id):
    """
    Query for a movie by id and returns that movie in a dictionary
    """
    movie = Movie.query.get(id)
    return jsonify(movie.to_dict())


@movie_routes.route("/current")
@login_required
def get_user_movies():
    """
    Query for all movies created by the current user and return them in a list of movie dictionaries
    """
    user_movies = Movie.query.filter(Movie.user_id == current_user.id)
    movies_dict = [movie.to_dict() for movie in user_movies]
    return jsonify(movies_dict)


# Deleting a Movie created by the user
@movie_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_movie(id):
    movie = Movie.query.get(id)
    # if movie is None or movie.user_id != current_user.id:
    if movie is None:
        return {"errors": "Movie not found"}, 404

    if movie.user_id != current_user.id:
        return {"errors": "You are not authorized to delete this movie"}, 403

    db.session.delete(movie)
    db.session.commit()

    return {"message": "Successfully Deleted"}


# Creating a new Movie
@movie_routes.route("/newMovie", methods=["POST"])
@login_required
def create_new_movie():
    form = CreateMovieForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    form.data["user_id"] = current_user.id
    if form.validate_on_submit():
        new_movie = Movie(
            user_id=form.data["user_id"],
            title=form.data["title"],
            release_year=form.data["release_year"],
            genre=form.data["genre"],
            director=form.data["director"],
            writer=form.data["writer"],
            description=form.data["description"],
            trailer=form.data["trailer"],
            img_url=form.data["img_url"],
        )
        db.session.add(new_movie)
        db.session.commit()
        return new_movie.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Adding an Actor to a Movie
@movie_routes.route("/<int:movie_id>/addActor", methods=["POST"])
@login_required
def add_actor_to_movie(movie_id):
    # Check if the movie exists
    movie = Movie.query.get(movie_id)
    if movie is None:
        return {"errors": "Movie not found"}, 404

    # Parse the actor_id from the request data
    data = request.get_json()
    actor_id = data.get("actor_id")
    print("Received data:", data)
    print("Received actor_id:", actor_id)

    # Check if the actor exists
    actor = Actor.query.get(actor_id)
    if actor is None:
        return {"errors": "Actor not found"}, 404

    # Add the actor to the movie in the movie_actor join table
    movie_actor = MovieActor(movie_id=movie_id, actor_id=actor_id)
    db.session.add(movie_actor)
    db.session.commit()

    return {"message": "Actor added to the movie successfully"}

# Removing an Actor from a Movie
@movie_routes.route("/<int:movie_id>/removeActor/<int:actor_id>", methods=["DELETE"])
@login_required
def remove_actor_from_movie(movie_id, actor_id):
    # Check if the movie exists
    movie = Movie.query.get(movie_id)
    if movie is None:
        return {"errors": "Movie not found"}, 404

    # Check if the actor exists
    actor = Actor.query.get(actor_id)
    if actor is None:
        return {"errors": "Actor not found"}, 404

    # Remove the actor from the movie in the movie_actor join table
    movie_actor = MovieActor.query.filter_by(movie_id=movie_id, actor_id=actor_id).first()
    if movie_actor:
        db.session.delete(movie_actor)
        db.session.commit()
        return {"message": "Actor removed from the movie successfully"}

    return {"errors": "Actor is not associated with this movie"}, 400

# Editing a Movie a user already created
@movie_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def edit_movie(id):
    movie = Movie.query.get(id)
    if movie is None:
        return {"errors": "Movie not found"}, 404

    if movie.user_id != current_user.id:
        return {"errors": "You are not authorized to edit this movie"}, 403

    form = EditMovieForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        movie.title = form.data["title"]
        movie.release_year = form.data["release_year"]
        movie.genre = form.data["genre"]
        movie.director = form.data["director"]
        movie.writer = form.data["writer"]
        movie.description = form.data["description"]
        movie.trailer = form.data["trailer"]
        movie.img_url = form.data["img_url"]

        db.session.commit()

        return movie.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

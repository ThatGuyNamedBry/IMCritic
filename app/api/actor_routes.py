from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Actor, Review, db
from app.forms import CreateActorForm, EditActorForm
from app.api.auth_routes import validation_errors_to_error_messages

actor_routes = Blueprint("actors", __name__)


@actor_routes.route("")
def get_all_actors():
    """
    Query for all actors and returns them in a list of actor dictionaries
    """
    return jsonify([actor.to_dict() for actor in Actor.query.all()])


@actor_routes.route("/<int:id>")
def get_actor_by_id(id):
    """
    Query for a actor by id and returns that actor in a dictionary
    """
    actor = Actor.query.get(id)
    return jsonify(actor.to_dict())

@actor_routes.route("/<int:id>/movies")
def get_actor_movies(id):
    actor = Actor.query.get(id)
    if actor is None:
        return {"errors": "Actor not found"}, 404

    movies = [movie.to_dict() for movie in actor.movie_actors]

    return jsonify(movies)


@actor_routes.route("/current")
@login_required
def get_user_actors():
    """
    Query for all actors created by the current user and return them in a list of actor dictionaries
    """
    user_actors = Actor.query.filter(Actor.user_id == current_user.id)
    actors_dict = [actor.to_dict() for actor in user_actors]
    return jsonify(actors_dict)


# Deleting a Actor created by the user
@actor_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_actor(id):
    actor = Actor.query.get(id)
    # if actor is None or actor.user_id != current_user.id:
    if actor is None:
        return {"errors": "Actor not found"}, 404

    if actor.user_id != current_user.id:
        return {"errors": "You are not authorized to delete this actor"}, 403

    db.session.delete(actor)
    db.session.commit()

    return {"message": "Successfully Deleted"}


# Creating a new Actor
@actor_routes.route("/newActor", methods=["POST"])
@login_required
def create_new_actor():
    form = CreateActorForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # form.data["user_id"] = current_user.id
    if form.validate_on_submit():
        new_actor = Actor(
            title=form.data["title"],
            name=form.data["name"],
            img_url=form.data["img_url"],
        )
        db.session.add(new_actor)
        db.session.commit()
        return new_actor.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Editing a Actor a user already created
@actor_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def edit_actor(id):
    actor = Actor.query.get(id)
    if actor is None:
        return {"errors": "Actor not found"}, 404

    if actor.user_id != current_user.id:
        return {"errors": "You are not authorized to edit this actor"}, 403

    form = EditActorForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        actor.name = form.data["name"]
        actor.img_url = form.data["img_url"]

        db.session.commit()

        return actor.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

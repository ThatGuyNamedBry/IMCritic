from app.models import db, environment, SCHEMA, MovieActor
from sqlalchemy.sql import text

def seed_movie_actors():
    movie_actor1 = MovieActor(
        movie_id=1,
        actor_id=1
    )
    movie_actor2 = MovieActor(
        movie_id=1,
        actor_id=2
    )
    movie_actor3 = MovieActor(
        movie_id=2,
        actor_id=1
    )

    movie_actor4 = MovieActor(
        movie_id=2,
        actor_id=2
    )

    db.session.add_all([movie_actor1, movie_actor2, movie_actor3, movie_actor4])
    db.session.commit()

def undo_movie_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movie_actor RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movie_actor"))

    db.session.commit()

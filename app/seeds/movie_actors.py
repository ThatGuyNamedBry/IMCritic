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
    movie_actor5 = MovieActor(
        movie_id=3,
        actor_id=1
    )
    movie_actor6 = MovieActor(
        movie_id=3,
        actor_id=2
    )
    movie_actor7 = MovieActor(
        movie_id=4,
        actor_id=1
    )
    movie_actor8 = MovieActor(
        movie_id=4,
        actor_id=2
    )
    movie_actor9 = MovieActor(
        movie_id=5,
        actor_id=3
    )
    movie_actor10 = MovieActor(
        movie_id=5,
        actor_id=4
    )
    movie_actor11 = MovieActor(
        movie_id=6,
        actor_id=3
    )
    movie_actor12 = MovieActor(
        movie_id=6,
        actor_id=5
    )
    movie_actor13 = MovieActor(
        movie_id=7,
        actor_id=3
    )
    movie_actor14 = MovieActor(
        movie_id=7,
        actor_id=5
    )
    movie_actor15 = MovieActor(
        movie_id=8,
        actor_id=6
    )
    movie_actor16 = MovieActor(
        movie_id=9,
        actor_id=7
    )
    movie_actor17 = MovieActor(
        movie_id=10,
        actor_id=7
    )
    movie_actor18 = MovieActor(
        movie_id=11,
        actor_id=7
    )
    movie_actor19 = MovieActor(
        movie_id=11,
        actor_id=3
    )


    db.session.add_all([movie_actor1, movie_actor2, movie_actor3, movie_actor4, movie_actor5, movie_actor6, movie_actor7, movie_actor8, movie_actor9, movie_actor10, movie_actor11, movie_actor12, movie_actor13, movie_actor14, movie_actor15, movie_actor16, movie_actor17, movie_actor18, movie_actor19])
    db.session.commit()

def undo_movie_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movie_actor RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movie_actor"))

    db.session.commit()

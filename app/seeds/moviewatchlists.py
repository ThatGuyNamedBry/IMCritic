from app.models import db, environment, SCHEMA, MovieWatchlist
from sqlalchemy.sql import text


def seed_movie_watchlists():
    movie_watchlist1 = MovieWatchlist(
        watchlist_id=1,
        movie_id=1
    )
    movie_watchlist2 = MovieWatchlist(
        watchlist_id=1,
        movie_id=2
    )
    movie_watchlist3 = MovieWatchlist(
        watchlist_id=2,
        movie_id=2
    )

    db.session.add_all([movie_watchlist1, movie_watchlist2, movie_watchlist3])
    db.session.commit()

def undo_movie_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movie_watchlist RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movie_watchlist"))

    db.session.commit()

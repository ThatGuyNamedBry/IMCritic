from app.models import db, environment, SCHEMA, Watchlist
from sqlalchemy.sql import text


def seed_watchlists():
    watchlist1 = Watchlist(
        user_id=1,
        name="My Favorites"
    )
    watchlist2 = Watchlist(
        user_id=1,
        name="Action Movies"
    )

    db.session.add_all([watchlist1, watchlist2])
    db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()

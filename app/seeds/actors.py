from app.models import db, environment, SCHEMA, Actor
from sqlalchemy.sql import text


def seed_actors():
    actor1 = Actor(
        name="Keanu Reeves",
        img_url="https://media.gq-magazine.co.uk/photos/63ee06e8b1322681bf7aa628/1:1/w_1080,h_1080,c_limit/Keanu-Reeves.jpg"
    )
    actor2 = Actor(
        name="Lance Reddick",
        img_url="https://upload.wikimedia.org/wikipedia/commons/5/5b/Lance_Reddick_by_Gage_Skidmore.jpg"
    )

    db.session.add_all([actor1, actor2])
    db.session.commit()

def undo_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actors"))

    db.session.commit()

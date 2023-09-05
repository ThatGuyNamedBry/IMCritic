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
    actor3 = Actor(
        name="Will Ferrell",
        img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Will_Ferrell_2012.jpg/220px-Will_Ferrell_2012.jpg"
    )
    actor4 = Actor(
        name="Mark Wahlberg",
        img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Mark_Wahlberg_2021.jpg/220px-Mark_Wahlberg_2021.jpg"
    )
    actor5 = Actor(
        name="John C. Reilly",
        img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/John_C._Reilly_%2843646997525%29_%28cropped_2%29.jpg/220px-John_C._Reilly_%2843646997525%29_%28cropped_2%29.jpg"
    )
    actor6 = Actor(
        name="Adam Sandlar",
        img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adam_Sandler_Cannes_2017.jpg/220px-Adam_Sandler_Cannes_2017.jpg"
    )
    actor7 = Actor(
        name="Steve Carrell",
        img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Steve_Carell_November_2014.jpg/220px-Steve_Carell_November_2014.jpg"
    )
    # actor8 = Actor(
    #     name="",
    #     img_url=""
    # )

    db.session.add_all([actor1, actor2, actor3, actor4, actor5, actor6, actor7])
    db.session.commit()

def undo_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actors"))

    db.session.commit()

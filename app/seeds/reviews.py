from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=1, movie_id=1, rating=4, content="Great movie, loved the action scenes!"
    )
    review2 = Review(
        user_id=2,
        movie_id=1,
        rating=5,
        content="John Wick is my favorite action series!",
    )
    review3 = Review(
        user_id=3, movie_id=2, rating=4, content="Solid sequel, action-packed."
    )

    db.session.add_all([review1, review2, review3])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

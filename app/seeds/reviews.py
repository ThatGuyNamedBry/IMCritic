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
    review4 = Review(
        user_id=1, movie_id=3, rating=5, content="Best of the series!."
    )
    review5 = Review(
        user_id=3, movie_id=4, rating=4, content="Somehow these keep getting better. I hope they do a fifth one!"
    )
    review6 = Review(
        user_id=2, movie_id=5, rating=5, content="Very funny, I couldn't stop laughing."
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

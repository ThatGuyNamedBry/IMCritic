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
    review7 = Review(
        user_id=1, movie_id=6, rating=5, content="One of my favorite movies ever!"
    )
    review8 = Review(
        user_id=1, movie_id=6, rating=5, content="Did we just become best friends? YUP!!"
    )
    review9 = Review(
        user_id=2, movie_id=7, rating=5, content="Took the family to see it, we all loved it. Keeps you entertained from start to finish!"
    )
    review10 = Review(
        user_id=3, movie_id=8, rating=4, content="I'll be watching this again when it comes on streaming platforms."
    )
    review11 = Review(
        user_id=3, movie_id=9, rating=5, content="Steve Carrell is the funniest actor on the planet!"
    )
    review12 = Review(
        user_id=3, movie_id=5, rating=4, content="I enjoyed this sequal even more than the first one. My kids liked it too."
    )
    review13 = Review(
        user_id=1, movie_id=11, rating=5, content="I LOVE LAMP"
    )
    review14 = Review(
        user_id=2, movie_id=11, rating=5, content="60 percent of the time, it works everytime."
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

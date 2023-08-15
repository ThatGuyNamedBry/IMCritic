from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime


class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    director = db.Column(db.String(255), nullable=False)
    writer = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    trailer = db.Column(db.String(255))
    img_url = db.Column(db.String(255))

    reviews = db.relationship("Review", back_populates="movie", cascade="all, delete")
    movie_watchlist = db.relationship('MovieWatchlist', back_populates='movie', cascade="all, delete")
    movie_actors = db.relationship("MovieActor", back_populates="movie", cascade="all, delete")

    def to_dict(self):
        reviews = self.reviews
        average_rating = 0.0

        if reviews:
            total_rating = sum(review.rating for review in reviews)
            average_rating = total_rating / len(reviews)
        return {
            'id': self.id,
            'title': self.title,
            'release_year': self.release_year,
            'genre': self.genre,
            'director': self.director,
            'writer': self.writer,
            'description': self.description,
            'trailer': self.trailer,
            'img_url': self.img_url,
            'actors': [actors.to_dict() for actors in self.movie_actors],
            'reviews': [reviews.to_dict() for reviews in self.reviews],
            'average_rating': average_rating,
        }


# movie_actor = db.Table('movie_actor',
#     db.Column('movie_id', db.Integer, db.ForeignKey(add_prefix_for_prod('movies.id')), primary_key=True),
#     db.Column('actor_id', db.Integer, db.ForeignKey(add_prefix_for_prod('actors.id')), primary_key=True)
# )

    # actors = db.relationship("Actor", secondary="movie_actor", back_populates="movies", cascade="all, delete")

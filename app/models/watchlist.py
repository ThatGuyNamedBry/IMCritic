from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .movie_watchlist import MovieWatchlist
from datetime import datetime

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    user = db.relationship('User', back_populates='watchlists')
    movies = db.relationship('Movie', secondary='movie_watchlist')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'movies': [movie.to_dict() for movie in self.movies]
        }

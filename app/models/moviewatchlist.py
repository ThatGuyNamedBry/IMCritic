from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime

class MovieWatchlist(db.Model):
    __tablename__ = 'movie_watchlist'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('movies.id')), nullable=False)

    watchlist = db.relationship('Watchlist')
    movie = db.relationship('Movie')

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'movie_id': self.movie_id
        }

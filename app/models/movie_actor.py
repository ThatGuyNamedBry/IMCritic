from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime

class MovieActor(db.Model):
    __tablename__ = 'movie_actor'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('movies.id')), primary_key=True)
    actor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('actors.id')), primary_key=True)

    movie = db.relationship('Movie', back_populates='movie_actors')
    actor = db.relationship('Actor', back_populates='movie_actors')

    def to_dict(self):
        return {
            'id': self.id,
            'movie_id': self.movie.id,
            'actor_id': self.actor.id
        }

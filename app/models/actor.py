from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime

class Actor(db.Model):
    __tablename__ = 'actors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)

    movie_actors = db.relationship("MovieActor", back_populates="actor")
    movies = db.relationship("Movie", secondary="movie_actor", back_populates="actors", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'img_url': self.img_url
        }

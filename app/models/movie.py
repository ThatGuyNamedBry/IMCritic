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

    reviews = db.relationship("Review", back_populates="movie")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_year': self.release_year,
            'genre': self.genre,
            'director': self.director,
            'writer': self.writer,
            'description': self.description,
            'trailer': self.trailer
        }

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, URL

class CreateMovieForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)])
    release_year = IntegerField('Release Year', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired(), Length(max=255)])
    director = StringField('Director', validators=[DataRequired(), Length(max=255)])
    writer = StringField('Writer', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired()])
    trailer = URLField('Trailer URL', validators=[ URL()])
    img_url = URLField('Image URL', validators=[DataRequired(), URL()])

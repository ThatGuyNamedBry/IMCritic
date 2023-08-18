from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, URLField, ValidationError
from wtforms.validators import DataRequired, Length, URL

class CreateMovieForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(min=2,max=255)])
    release_year = IntegerField('Release Year', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired(), Length(min=4, max=255)])
    director = StringField('Director', validators=[DataRequired(), Length(min=4, max=255)])
    writer = StringField('Writer', validators=[DataRequired(), Length(min=4, max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=50, max=1000)])
    trailer = URLField('Trailer URL', validators=[ URL()])
    img_url = URLField('Image URL', validators=[DataRequired(), URL()])

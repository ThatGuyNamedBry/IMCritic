from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, URLField, ValidationError
from wtforms.validators import DataRequired, Length, URL

class EditActorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2,max=255)])
    img_url = URLField('Image URL', validators=[DataRequired(), URL()])

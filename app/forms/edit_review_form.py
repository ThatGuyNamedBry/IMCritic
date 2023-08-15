from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class EditReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[])
    submit = SubmitField('Submit')

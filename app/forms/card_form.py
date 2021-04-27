from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Card


class CardForm(FlaskForm):
    question = StringField('question', validators=[DataRequired()])
    answer = IntegerField('answer', validators=[DataRequired()])

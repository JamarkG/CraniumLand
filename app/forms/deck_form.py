from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Deck


class DeckForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    tag = IntegerField('tag', validaotrs=[DataRequired()])
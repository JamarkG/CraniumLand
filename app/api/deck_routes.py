from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms.deck_form import DeckForm
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Deck, Card

deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/')
def decks():
    decks = Deck.query.all()
    return {"decks" : [deck.to_dict() for deck in decks]}

@deck_routes.route('/<int:id>/cards')
def cards(id):
    deck = Deck.query.get(id)
    cards = Card.query.filter_by(deckid=id).all()
    return {'cards' : [card.to_dict() for card in cards]}

@deck_routes.route('/', methods=['POST'])
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = Deck(
            userid=current_user.id,
            name=form.data['name'],
            tag=form.data['tag']
        )
        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

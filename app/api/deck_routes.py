from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Deck
from app.models import Card

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

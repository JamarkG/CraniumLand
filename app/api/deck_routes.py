from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms.deck_form import DeckForm
from ..forms.card_form import CardForm
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
    return {'cards': [card.to_dict() for card in cards]}

@deck_routes.route('/<int:id>/cards', methods=['POST'])
def create_card(id):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        card = Card(
            deckid=id,
            question=form.data['question'],
            answer=form.data['answer']
        )
        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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


@deck_routes.route('/<int:deckId>/cards/<int:cardId>/delete', methods=['DELETE'])
def delete_card(deckId, cardId):
    card = Card.query.get(cardId)
    db.session.delete(card)
    db.session.commit()
    return {"success" : "this worked"}

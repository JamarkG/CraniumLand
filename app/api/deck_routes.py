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

@deck_routes.route('/<int:id>')
def cards(id):
    deck = Deck.query.get(id)
    cards = Card.query.filter_by(deckid=id).all()
    return {
        'deck': deck.to_dict(),
        'cards': [card.to_dict() for card in cards]
        }

@deck_routes.route('/<int:id>', methods=['POST'])
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

@deck_routes.route('/<int:deckId>/delete', methods=['DELETE'])
def delete_deck(deckId):
    deck = Deck.query.get(deckId)
    # print(deck)
    cards = Card.query.filter_by(deckid=deckId).all()
    for card in cards:
        db.session.delete(card)
    db.session.delete(deck)
    db.session.commit()
    return {"success" : "this worked"}


@deck_routes.route('/<int:deckId>/cards/<int:cardId>/delete', methods=['DELETE'])
def delete_card(deckId, cardId):
    card = Card.query.get(cardId)
    db.session.delete(card)
    db.session.commit()
    return {"success" : "this worked"}



@deck_routes.route('/<int:deckId>/cards/<int:cardId>/edit', methods=['POST'])
def edit_card(deckId, cardId):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    oldCard = Card.query.get(cardId)
    print(oldCard)
    question = form.data["question"]
    answer = form.data["answer"]

    oldCard.answer = answer
    oldCard.question = question
    
    db.session.commit()

    print(oldCard)
    return oldCard.to_dict()

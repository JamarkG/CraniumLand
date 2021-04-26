from app.models import db, Card

def seed_cards():

    card1 = Card(deckid='1', answer='Yes', question='Did this work?')
    card2 = Card(deckid='1', answer='2nd card', question='What card is this?')
    card3= Card(deckid='2', answer='In the 2nd deck', question='What deck is this in?')

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)

    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()

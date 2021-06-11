from app.models import db, Card

def seed_cards():

    card1 = Card(deckid='1', answer='What is the syntax of a For Loop?', question='for(let i = 0; i < x; i++)')
    card2 = Card(deckid='1', answer='What is .length()?', question='Method for iterables to determine number of elements.')
    card3= Card(deckid='2', answer='What is an array?', question='Ordered list of values.')

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)

    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()

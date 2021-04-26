from app.models import db, Deck

def seed_decks():

    deck1 = Deck(userid='1', name='Javascript', tag='1')
    deck2 = Deck(userid='1', name='Python', tag='1')

    db.session.add(deck1)
    db.session.add(deck2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()

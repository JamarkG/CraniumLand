from app.models import db, Tag

def seed_tags():

    tag1 = Tag(name='Languages')

    db.session.add(tag1)

    db.session.commit()

def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()

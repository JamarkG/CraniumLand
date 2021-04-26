from .db import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    deckid = db.Column(db.Integer, db.ForeignKey('decks.id'))
    answer = db.Column(db.String(255), nullable=False)
    question = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "deckid": self.deckid,
            "answer": self.answer,
            "question": self.question
        }

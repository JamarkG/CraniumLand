from .db import db

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.Integer, ForeignKey('users.id'))
    name = db.Column(db.String(100), nullable = False, unique = True)
    tag = db.Column(db.Integer, ForeignKey('tags.id'), nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "name": self.name,
            "tag": self.tag
        }

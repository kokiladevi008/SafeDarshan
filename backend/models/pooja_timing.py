from extensions import db

class PoojaTiming(db.Model):
    __tablename__ = 'pooja_timings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    pooja_name = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.String(20), nullable=False) # e.g. '07:00 AM'
    end_time = db.Column(db.String(20), nullable=False)   # e.g. '08:00 AM'
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "temple_id": self.temple_id,
            "pooja_name": self.pooja_name,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "description": self.description
        }

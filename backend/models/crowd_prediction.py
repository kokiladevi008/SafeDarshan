from extensions import db

class CrowdPrediction(db.Model):
    __tablename__ = 'crowd_predictions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    predicted_count = db.Column(db.Integer, default=0)
    crowd_level = db.Column(db.String(20), default='Moderate') # Low, Moderate, High, Very High
    waiting_time = db.Column(db.Integer, default=30)           # in minutes
    recommended_slot = db.Column(db.String(50), nullable=False)
    risk_level = db.Column(db.String(20), default='Low')        # Low, Medium, High, Critical

    def to_dict(self):
        return {
            "id": self.id,
            "temple_id": self.temple_id,
            "date": self.date,
            "time": self.time,
            "predicted_count": self.predicted_count,
            "crowd_level": self.crowd_level,
            "waiting_time_minutes": self.waiting_time,
            "recommended_slot": self.recommended_slot,
            "risk_level": self.risk_level
        }

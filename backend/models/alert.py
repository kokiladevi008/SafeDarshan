from extensions import db
from datetime import datetime

class Alert(db.Model):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    zone = db.Column(db.String(50), nullable=False)
    risk_level = db.Column(db.String(20), default='Medium') # Low, Medium, High, Critical
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "temple_id": self.temple_id,
            "temple_name": self.temple.name if self.temple else "",
            "zone": self.zone,
            "risk_level": self.risk_level,
            "message": self.message,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None
        }

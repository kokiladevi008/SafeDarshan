from extensions import db
from datetime import datetime

class CrowdData(db.Model):
    __tablename__ = 'crowd_data'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    zone = db.Column(db.String(50), nullable=False) # 'Entrance', 'Queue Area', 'Waiting Area', 'Main Hall', 'Sanctum Area', 'Exit'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    people_count = db.Column(db.Integer, default=0)
    capacity = db.Column(db.Integer, default=200)
    occupancy = db.Column(db.Float, default=0.0)
    crowd_level = db.Column(db.String(20), default='Low') # Low, Moderate, High, Very High

    def to_dict(self):
        return {
            "id": self.id,
            "temple_id": self.temple_id,
            "zone": self.zone,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            "people_count": self.people_count,
            "capacity": self.capacity,
            "occupancy": round(self.occupancy, 1),
            "crowd_level": self.crowd_level
        }

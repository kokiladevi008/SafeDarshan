from extensions import db
from datetime import datetime

class CheckIn(db.Model):
    __tablename__ = 'checkins'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    checkin_time = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='SUCCESSFUL')

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "checkin_time": self.checkin_time.isoformat() if self.checkin_time else None,
            "status": self.status
        }

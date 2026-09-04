from extensions import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    slot_id = db.Column(db.Integer, db.ForeignKey('darshan_slots.id'), nullable=False)
    booking_id = db.Column(db.String(30), unique=True, nullable=False) # e.g. SD20260001
    visitor_count = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), default='CONFIRMED') # 'CONFIRMED', 'CHECKED_IN', 'CANCELLED'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    temple = db.relationship('Temple', backref='bookings', lazy=True)
    checkins = db.relationship('CheckIn', backref='booking', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "user_id": self.user_id,
            "user_name": self.user.name if self.user else "Devotee",
            "temple_id": self.temple_id,
            "temple_name": self.temple.name if self.temple else "",
            "temple_image": self.temple.image_url if self.temple else "",
            "slot_id": self.slot_id,
            "date": self.slot.date if self.slot else "",
            "time": f"{self.slot.start_time} - {self.slot.end_time}" if self.slot else "",
            "visitor_count": self.visitor_count,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

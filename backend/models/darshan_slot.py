from extensions import db

class DarshanSlot(db.Model):
    __tablename__ = 'darshan_slots'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)        # YYYY-MM-DD
    start_time = db.Column(db.String(20), nullable=False)  # HH:MM
    end_time = db.Column(db.String(20), nullable=False)    # HH:MM
    capacity = db.Column(db.Integer, default=500)
    booked_count = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='AVAILABLE')  # 'AVAILABLE', 'FULL', 'CANCELLED'

    bookings = db.relationship('Booking', backref='slot', lazy=True)

    def to_dict(self):
        available_seats = max(0, self.capacity - self.booked_count)
        is_available = self.status == 'AVAILABLE' and available_seats > 0
        return {
            "id": self.id,
            "temple_id": self.temple_id,
            "date": self.date,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "capacity": self.capacity,
            "booked_count": self.booked_count,
            "available_seats": available_seats,
            "status": self.status if is_available else 'FULL'
        }

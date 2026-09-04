from extensions import db

class Temple(db.Model):
    __tablename__ = 'temples'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(50), nullable=False)         # 'Tamil Nadu', 'Andhra Pradesh', 'Kerala'
    location = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)    # e.g., '/temples/marudamalai.jpg'
    opening_time = db.Column(db.String(20), nullable=False) # e.g., '06:00 AM'
    closing_time = db.Column(db.String(20), nullable=False) # e.g., '08:30 PM'
    capacity = db.Column(db.Integer, default=1000)

    pooja_timings = db.relationship('PoojaTiming', backref='temple', lazy=True, cascade="all, delete-orphan")
    darshan_slots = db.relationship('DarshanSlot', backref='temple', lazy=True, cascade="all, delete-orphan")
    crowd_data = db.relationship('CrowdData', backref='temple', lazy=True, cascade="all, delete-orphan")
    predictions = db.relationship('CrowdPrediction', backref='temple', lazy=True, cascade="all, delete-orphan")
    alerts = db.relationship('Alert', backref='temple', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "state": self.state,
            "location": self.location,
            "description": self.description,
            "image_url": self.image_url,
            "opening_time": self.opening_time,
            "closing_time": self.closing_time,
            "capacity": self.capacity
        }

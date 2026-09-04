import datetime
import random
from app import create_app
from extensions import db
from models import User, Temple, PoojaTiming, DarshanSlot, CrowdData, CrowdPrediction, Alert, Booking, CheckIn

def seed_database():
    app = create_app()
    with app.app_context():
        print("Dropping existing tables and creating fresh schema...")
        db.drop_all()
        db.create_all()

        print("Seeding Users...")
        admin = User(
            name="System Admin",
            email="admin@safedarshan.com",
            phone="9876543210",
            password="admin123",
            preferred_language="en",
            role="admin"
        )
        demo_user = User(
            name="Devotee User",
            email="user@safedarshan.com",
            phone="9123456789",
            password="user123",
            preferred_language="ta",
            role="user"
        )
        db.session.add_all([admin, demo_user])
        db.session.commit()

        print("Seeding 6 Temples...")
        temples_data = [
            {
                "name": "Marudamalai Murugan Temple",
                "state": "Tamil Nadu",
                "location": "Coimbatore, Tamil Nadu",
                "description": "Situated on a scenic hilllock of the Western Ghats, Marudamalai Murugan Temple is dedicated to Lord Murugan. Surrounded by medicinal herbs, it is renowned for its spiritual aura and soothing atmosphere.",
                "image_url": "/temples/marudamalai.jpg",
                "opening_time": "06:00 AM",
                "closing_time": "08:30 PM",
                "capacity": 800
            },
            {
                "name": "Masani Amman Temple",
                "state": "Tamil Nadu",
                "location": "Anaimalai, Coimbatore, Tamil Nadu",
                "description": "Located at the confluence of Aliyar River and Uppar Stream, Masani Amman Temple is a revered shrine of Goddess Shakti depicted in a unique reclining posture, known for fulfilling devotees' prayers.",
                "image_url": "/temples/masani-amman.jpg",
                "opening_time": "06:00 AM",
                "closing_time": "08:00 PM",
                "capacity": 700
            },
            {
                "name": "Palani Murugan Temple",
                "state": "Tamil Nadu",
                "location": "Palani, Dindigul, Tamil Nadu",
                "description": "One of the sacred Arupadai Veedu shrines of Lord Murugan, Palani Temple sits atop Sivagiri hill. Devotees climb the 659 stone steps or take the rope car to worship Lord Dhandayuthapani.",
                "image_url": "/temples/palani.jpg",
                "opening_time": "05:30 AM",
                "closing_time": "09:00 PM",
                "capacity": 1200
            },
            {
                "name": "Arunachaleswarar Temple",
                "state": "Tamil Nadu",
                "location": "Tiruvannamalai, Tamil Nadu",
                "description": "One of the grandest Pancha Bhoota Stalam representing the Fire (Agni) element, this ancient temple complex at the foot of Annamalai Hill features soaring gopurams and immense spiritual significance.",
                "image_url": "/temples/tiruvannamalai.jpg",
                "opening_time": "05:30 AM",
                "closing_time": "09:30 PM",
                "capacity": 1500
            },
            {
                "name": "Tirumala Venkateswara Temple",
                "state": "Andhra Pradesh",
                "location": "Tirupati, Andhra Pradesh",
                "description": "Nestled on the Seshachalam Hills, Tirumala Venkateswara Temple is dedicated to Lord Vishnu (Venkateswara). It is one of the most visited and sacred pilgrimage centers in the world.",
                "image_url": "/temples/tirupati.jpg",
                "opening_time": "03:00 AM",
                "closing_time": "11:00 PM",
                "capacity": 2500
            },
            {
                "name": "Sabarimala Sree Dharma Sastha Temple",
                "state": "Kerala",
                "location": "Pathanamthitta, Kerala",
                "description": "Situated among eighteen hills in the dense Western Ghats forest, Sabarimala is the holy abode of Lord Ayyappan. Devotees ascend the revered 18 golden steps (Pathinettam Padi) for divine blessings.",
                "image_url": "/temples/sabarimala.jpg",
                "opening_time": "04:00 AM",
                "closing_time": "10:00 PM",
                "capacity": 2000
            }
        ]

        temple_objs = []
        for t in temples_data:
            obj = Temple(**t)
            db.session.add(obj)
            temple_objs.append(obj)
        
        db.session.commit()

        print("Seeding Pooja Timings, Darshan Slots & Crowd Data for all temples...")
        random.seed(42) # Deterministic seeding

        today = datetime.date.today()

        zones = ["Entrance", "Queue Area", "Waiting Area", "Main Hall", "Sanctum Area", "Exit"]

        for temple in temple_objs:
            # 1. Pooja Timings
            p1 = PoojaTiming(temple_id=temple.id, pooja_name="Morning Kaalai Pooja", start_time="07:00 AM", end_time="08:00 AM", description="Holy morning abhishekam & alankaram")
            p2 = PoojaTiming(temple_id=temple.id, pooja_name="Uchikala Special Pooja", start_time="10:30 AM", end_time="11:30 AM", description="Midday special deeparadhana")
            p3 = PoojaTiming(temple_id=temple.id, pooja_name="Evening Sayarakshai Pooja", start_time="06:00 PM", end_time="07:00 PM", description="Evening sacred lamps & prasadam offering")
            db.session.add_all([p1, p2, p3])

            # 2. Darshan Slots for next 7 days
            time_windows = [
                ("08:00", "09:00"),
                ("11:00", "12:00"),
                ("14:00", "15:00"),
                ("18:00", "19:00")
            ]

            for day_offset in range(7):
                slot_date = (today + datetime.timedelta(days=day_offset)).strftime("%Y-%m-%d")
                for start, end in time_windows:
                    # Afternoons have lower crowds
                    if start == "14:00":
                        booked = random.randint(80, 180)
                    else:
                        booked = random.randint(220, 480)
                    
                    booked = min(temple.capacity, booked)
                    slot = DarshanSlot(
                        temple_id=temple.id,
                        date=slot_date,
                        start_time=start,
                        end_time=end,
                        capacity=temple.capacity,
                        booked_count=booked,
                        status='AVAILABLE' if booked < temple.capacity else 'FULL'
                    )
                    db.session.add(slot)

            # 3. Zone Crowd Data
            for zone_name in zones:
                z_cap = 250
                people = random.randint(40, 220)
                occ = (people / z_cap) * 100.0
                clevel = "Low" if occ < 35 else ("Moderate" if occ < 65 else ("High" if occ < 85 else "Very High"))
                
                cdata = CrowdData(
                    temple_id=temple.id,
                    zone=zone_name,
                    people_count=people,
                    capacity=z_cap,
                    occupancy=occ,
                    crowd_level=clevel
                )
                db.session.add(cdata)

            # 4. Crowd Alerts
            alert = Alert(
                temple_id=temple.id,
                zone="Queue Area",
                risk_level="Medium" if temple.id % 2 == 0 else "High",
                message=f"Moderate-to-high queue crowd observed at {temple.name}. Recommended visiting time: 14:00-15:00."
            )
            db.session.add(alert)

        db.session.commit()

        # Seed sample demo booking
        first_slot = DarshanSlot.query.filter_by(temple_id=1).first()
        demo_booking = Booking(
            user_id=demo_user.id,
            temple_id=1,
            slot_id=first_slot.id,
            booking_id="SD20261001",
            visitor_count=2,
            status="CONFIRMED"
        )
        db.session.add(demo_booking)
        db.session.commit()

        print("Database Seeding Completed Successfully!")

if __name__ == '__main__':
    seed_database()

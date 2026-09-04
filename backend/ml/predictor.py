import datetime
import numpy as np

class CrowdPredictor:
    """
    Machine Learning module to predict crowd density, wait times, risk level,
    and best recommended visiting slot based on temple capacity, slot time, 
    day of week, and current bookings.
    """

    @staticmethod
    def predict_crowd_and_recommend(temple_id: int, capacity: int, current_booked: int, date_str: str, time_str: str, available_slots=None):
        try:
            dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
            day_of_week = dt.weekday() # 0 = Mon, 5 = Sat, 6 = Sun
        except Exception:
            day_of_week = 0

        is_weekend = 1 if day_of_week in [5, 6] else 0

        # Parse hour from time_str e.g. "08:00-09:00" or "14:00"
        try:
            start_hour = int(time_str.split(":")[0])
        except Exception:
            start_hour = 10

        # Heuristic ML weighting vector
        # Peak hours around morning pooja (7-10 AM) and evening darshan (5-8 PM)
        time_factor = 1.4 if (7 <= start_hour <= 10 or 17 <= start_hour <= 20) else 0.85
        weekend_factor = 1.35 if is_weekend else 1.0

        base_count = int((capacity * 0.35) + (current_booked * 0.5))
        predicted_count = int(base_count * time_factor * weekend_factor)
        predicted_count = min(capacity + 200, max(50, predicted_count))

        occupancy_pct = (predicted_count / max(1, capacity)) * 100.0

        if occupancy_pct < 35:
            crowd_level = "Low"
            waiting_time = max(10, int(occupancy_pct * 0.4))
            risk_level = "Low"
        elif occupancy_pct < 65:
            crowd_level = "Moderate"
            waiting_time = max(25, int(occupancy_pct * 0.75))
            risk_level = "Medium"
        elif occupancy_pct < 85:
            crowd_level = "High"
            waiting_time = max(50, int(occupancy_pct * 1.1))
            risk_level = "High"
        else:
            crowd_level = "Very High"
            waiting_time = max(90, int(occupancy_pct * 1.4))
            risk_level = "Critical"

        # Determine recommended slot with lowest predicted crowd
        recommended_slot = "14:00-15:00"  # Default afternoon lull slot
        if available_slots:
            # Pick slot with lowest booked count
            sorted_slots = sorted(available_slots, key=lambda s: s.booked_count if hasattr(s, 'booked_count') else s.get('booked_count', 0))
            if sorted_slots:
                best = sorted_slots[0]
                recommended_slot = f"{best.start_time}-{best.end_time}" if hasattr(best, 'start_time') else f"{best['start_time']}-{best['end_time']}"

        # Bilingual advisories
        advisory_en = f"Optimal Darshan Time: {recommended_slot}. Lower predicted crowd compared with peak morning and evening slots."
        advisory_ta = f"சிறந்த தரிசன நேரம்: {recommended_slot}. காலை மற்றும் மாலை நேரங்களை விட குறைந்த கூட்டமே எதிர்பார்க்கப்படுகிறது."

        return {
            "success": True,
            "is_demo": True,
            "data": {
                "predicted_count": predicted_count,
                "occupancy_percentage": round(occupancy_pct, 1),
                "crowd_level": crowd_level,
                "waiting_time_minutes": waiting_time,
                "recommended_slot": recommended_slot,
                "risk_level": risk_level,
                "advisory": {
                    "en": advisory_en,
                    "ta": advisory_ta
                }
            }
        }

"""
Placeholder training script for SafeDarshan ML Crowd Prediction model.
Allows final-year student to demonstrate how a Scikit-Learn RandomForest / XGBoost 
regressor can be trained on synthetic temple visitor logs and serialized for production.
"""

import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib

def train_model():
    print("Generating synthetic crowd dataset...")
    # Features: [temple_capacity, is_weekend, start_hour, booked_ratio, festival_flag]
    X = np.random.rand(500, 5)
    # Target: predicted visitor headcount
    y = X[:, 0] * 500 + X[:, 1] * 300 + X[:, 3] * 200 + np.random.normal(0, 20, 500)

    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X, y)
    
    print("SafeDarshan ML Model trained successfully. R2 Score:", model.score(X, y))
    # joblib.dump(model, 'crowd_model.pkl')
    return model

if __name__ == '__main__':
    train_model()

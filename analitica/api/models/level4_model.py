import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score, precision_score, recall_score, f1_score
import numpy as np
import joblib

# Modelo de predicción de compromiso
def train_or_update_engagement_prediction(df, model_path="saved_model/model_engagement_prediction.pkl"):
    features = df[[
        "days_since_last_access", "participation_slope", 
        "accesses_last_7_days", "avg_time_per_connection", 
        "missed_activities"
    ]]
    target = df["average_grade_last_3_activities"]
    student_info = df[["student_id", "student_name"]]

    X_train, X_test, y_train, y_test, student_train, student_test = train_test_split(
        features, target, student_info, test_size=0.2, random_state=42
    )

    if os.path.exists(model_path):
        model = joblib.load(model_path)
        model.fit(X_train, y_train)
    else:
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))

    predictions_with_students = []
    for idx, pred in enumerate(y_pred):
        predictions_with_students.append({
            "student_id": student_test.iloc[idx]["student_id"],
            "student_name": student_test.iloc[idx]["student_name"],
            "predicted_grade": float(round(pred, 2))
        })

    joblib.dump(model, model_path)

    return model, {"rmse": float(round(rmse, 2)), "predictions": predictions_with_students}

# Modelo de clasificación de riesgo de deserción
def classify_engagement_risk(df, model_path="saved_model/model_engagement_risk.pkl"):
    df["risk_label"] = df["average_grade_last_3_activities"].apply(lambda x: 1 if x < 7 else 0)
    features = df[[
        "days_since_last_access", "participation_slope", 
        "accesses_last_7_days", "missed_activities"
    ]]
    target = df["risk_label"]
    student_info = df[["student_id", "student_name"]]

    X_train, X_test, y_train, y_test, student_train, student_test = train_test_split(
        features, target, student_info, test_size=0.2, random_state=42
    )

    if os.path.exists(model_path):
        model = joblib.load(model_path)
        model.fit(X_train, y_train)
    else:
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    students_predictions = []
    for idx, pred in enumerate(y_pred):
        students_predictions.append({
            "student_id": student_test.iloc[idx]["student_id"],
            "student_name": student_test.iloc[idx]["student_name"],
            "predicted_risk": "At Risk" if pred == 1 else "Safe"
        })

    joblib.dump(model, model_path)

    return model, {"accuracy": float(round(accuracy, 2)), "students_predictions": students_predictions}

# Clustering de patrones de compromiso
def cluster_engagement_patterns(df, n_clusters=3):
    features = df[[
        "days_since_last_access", "participation_slope", 
        "accesses_last_7_days", "avg_time_per_connection", 
        "missed_activities"
    ]]
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features_scaled)

    df["engagement_cluster"] = clusters

    cluster_profiles = {}
    for cluster_id in range(n_clusters):
        cluster_data = df[df["engagement_cluster"] == cluster_id]
        cluster_profiles[f"Cluster {cluster_id}"] = {
            "total_students": int(cluster_data.shape[0]),
            "average_grade": float(cluster_data["average_grade_last_3_activities"].mean()),
            "average_time_per_connection": float(cluster_data["avg_time_per_connection"].mean()),
            "students": cluster_data[["student_id", "student_name"]].to_dict(orient="records")
        }

    return cluster_profiles

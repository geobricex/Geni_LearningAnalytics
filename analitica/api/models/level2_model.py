import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score, precision_score, recall_score, f1_score
import numpy as np
import joblib


def train_or_update_interaction_model(df, model_path="saved_model/model_interaction_time.pkl"):
    features = df[["accesses_last_7_days", "resources_visited", "forum_posts"]]
    target = df["total_connection_time_minutes"]
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
            "predicted_connection_time": float(round(pred, 2))
        })

    joblib.dump(model, model_path)

    return model, {"rmse": float(round(rmse, 2)), "predictions": predictions_with_students}


def classify_interaction_risk(df, model_path="saved_model/model_interaction_risk.pkl"):
    df["interaction_label"] = df["accesses_last_7_days"].apply(lambda x: 1 if x >= 4 else 0)
    features = df[["accesses_last_7_days", "resources_visited", "forum_posts"]]
    target = df["interaction_label"]
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

    accuracy = float(round(accuracy_score(y_test, y_pred), 2))
    precision = float(round(precision_score(y_test, y_pred, zero_division=0), 2))
    recall = float(round(recall_score(y_test, y_pred, zero_division=0), 2))
    f1 = float(round(f1_score(y_test, y_pred, zero_division=0), 2))

    students_predictions = []
    for idx, pred in enumerate(y_pred):
        students_predictions.append({
            "student_id": student_test.iloc[idx]["student_id"],
            "student_name": student_test.iloc[idx]["student_name"],
            "predicted_label": "Engaged" if pred == 1 else "At Risk"
        })

    joblib.dump(model, model_path)

    return model, {"accuracy": accuracy, "precision": precision, "recall": recall, "f1_score": f1, "students_predictions": students_predictions}


def cluster_interaction_patterns(df, n_clusters=3):
    features = df[["accesses_last_7_days", "resources_visited", "forum_posts"]]
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features_scaled)

    df["interaction_cluster"] = clusters

    cluster_profiles = {}
    for cluster_id in range(n_clusters):
        cluster_data = df[df["interaction_cluster"] == cluster_id]
        cluster_profiles[f"Cluster {cluster_id}"] = {
            "total_students": int(cluster_data.shape[0]),
            "average_accesses": float(cluster_data["accesses_last_7_days"].mean()),
            "average_resources": float(cluster_data["resources_visited"].mean()),
            "average_forum_posts": float(cluster_data["forum_posts"].mean()),
            "students": cluster_data[["student_id", "student_name"]].to_dict(orient="records")
        }

    return cluster_profiles

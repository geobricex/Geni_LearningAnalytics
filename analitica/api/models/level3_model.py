import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score, precision_score, recall_score, f1_score
import numpy as np
import joblib
from sklearn.ensemble import GradientBoostingClassifier
from imblearn.over_sampling import SMOTE, RandomOverSampler
from collections import Counter

def train_or_update_academic_performance_model(df, model_path="saved_model/model_academic_performance.pkl"):
    features = df[[
        "family_income_monthly", "income_per_capita", "accesses_last_7_days", 
        "total_connection_time_minutes", "resources_visited", "forum_posts",
        "commute_time_minutes", "housing_density"
    ]]
    target = df["average_grade"]
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


def classify_socioeconomic_risk(df, model_path="saved_model/model_socioeconomic_risk.pkl"):
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
    from sklearn.model_selection import train_test_split
    import joblib
    import os

    # Crear la etiqueta de riesgo
    df["risk_label"] = df["average_grade"].apply(lambda x: 1 if x < 7 else 0)
    features = df[[
        "family_income_monthly", "income_per_capita", "accesses_last_7_days", 
        "total_connection_time_minutes", "resources_visited", "forum_posts",
        "commute_time_minutes", "housing_density"
    ]]
    target = df["risk_label"]
    student_info = df[["student_id", "student_name"]]

    # División de los datos
    X_train, X_test, y_train, y_test, student_train, student_test = train_test_split(
        features, target, student_info, test_size=0.2, random_state=42
    )

    # Verificar el tamaño de la clase minoritaria
    class_counts = Counter(y_train)

    if min(class_counts.values()) > 1:
        # Camino 1: Aplicar SMOTE si hay suficientes muestras en la clase minoritaria
        smote = SMOTE(random_state=42, k_neighbors=min(5, min(class_counts.values()) - 1))
        X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
        print("Usando SMOTE para balancear las clases.")
    elif min(class_counts.values()) == 1:
        # Camino 2a: Si solo hay una muestra, usar RandomOverSampler
        print("Usando RandomOverSampler debido a clase minoritaria con una sola muestra.")
        ros = RandomOverSampler(random_state=42)
        X_resampled, y_resampled = ros.fit_resample(X_train, y_train)
    else:
        # Camino 2b: Si no hay suficiente muestra, usar los datos originales sin sobremuestreo
        print("Insuficientes muestras para aplicar sobremuestreo, usando datos originales.")
        X_resampled, y_resampled = X_train, y_train

    # Cargar o entrenar el modelo
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        model.fit(X_resampled, y_resampled)
    else:
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_resampled, y_resampled)

    # Predicción y evaluación
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
            "predicted_risk": "At Risk" if pred == 1 else "Safe"
        })

    # Guardar el modelo actualizado
    joblib.dump(model, model_path)

    return model, {
        "accuracy": accuracy, 
        "precision": precision, 
        "recall": recall, 
        "f1_score": f1, 
        "students_predictions": students_predictions
    }

def cluster_socioeconomic_profiles(df, n_clusters=3):
    features = df[[
        "family_income_monthly", "income_per_capita", "accesses_last_7_days", 
        "total_connection_time_minutes", "resources_visited", "forum_posts",
        "commute_time_minutes", "housing_density"
    ]]
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features_scaled)

    df["socioeconomic_cluster"] = clusters

    cluster_profiles = {}
    for cluster_id in range(n_clusters):
        cluster_data = df[df["socioeconomic_cluster"] == cluster_id]
        cluster_profiles[f"Cluster {cluster_id}"] = {
            "total_students": int(cluster_data.shape[0]),
            "average_grade": float(cluster_data["average_grade"].mean()),
            "average_income": float(cluster_data["family_income_monthly"].mean()),
            "students": cluster_data[["student_id", "student_name"]].to_dict(orient="records")
        }

    return cluster_profiles

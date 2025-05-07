import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np
import joblib

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def train_or_update_model(df, model_path="saved_model/model_remaining_minutes.pkl"):
    """
    Carga un modelo existente y lo actualiza con nuevos datos, o entrena uno nuevo si no existe.
    Ahora asocia predicciones a estudiantes.
    """
    features = df.copy()
    features["grade_std"] = features.groupby("student_id")["grade"].transform("std").fillna(0)
    features["previous_activities"] = features.groupby("student_id").cumcount()

    # Definir X (variables) y y (target)
    X = features[["grade", "max_grade", "grade_std", "previous_activities"]]
    y = features["remaining_minutes"]
    student_info = features[["student_id", "student_name"]]  # Datos adicionales para seguir el rastro

    # Dividir en train y test incluyendo el ID y nombre
    X_train, X_test, y_train, y_test, student_train, student_test = train_test_split(
        X, y, student_info, test_size=0.2, random_state=42
    )

    # Comprobar si el modelo ya existe
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        model.fit(X, y)  # Actualizar el modelo completo
    else:
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)

    # Predicciones
    y_pred = model.predict(X_test)

    # Asociar predicciones con el estudiante
    predictions_with_students = []
    for idx, pred in enumerate(y_pred):
        predictions_with_students.append({
            "student_id": student_test.iloc[idx]["student_id"],
            "student_name": student_test.iloc[idx]["student_name"],
            "predicted_remaining_minutes": round(pred, 2)
        })

    # Evaluaciones
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)

    evaluation = {
        "rmse": round(rmse, 2),
        "mae": round(mae, 2),
        "sample_predictions": predictions_with_students[:5]  # Solo los 5 primeros para el resumen
    }

    # Guardar el modelo
    joblib.dump(model, model_path)

    return model, evaluation

def cluster_students(df, n_clusters=3):
    """
    Groups students based on their academic performance and submission behavior.
    
    Args:
        df (DataFrame): Processed activities DataFrame.
        n_clusters (int): Number of desired clusters.

    Returns:
        dict: Cluster profiling information.
    """
    # Prepare student-level summary
    student_summary = (
        df.groupby(["student_id", "student_name"])
        .agg(
            average_grade=("grade", "mean"),
            average_remaining_minutes=("remaining_minutes", "mean"),
            standard_deviation_grade=("grade", "std")
        )
        .fillna(0)
        .reset_index()
    )

    features = student_summary[["average_grade", "average_remaining_minutes", "standard_deviation_grade"]]

    # Scale the features
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features_scaled)

    # Assign clusters to students
    student_summary["cluster"] = clusters

    # Analyze and label each cluster
    cluster_profiles = {}
    # Modificado para siempre asignar
    for cluster_id in range(n_clusters):
        cluster_data = student_summary[student_summary["cluster"] == cluster_id]

        if cluster_data.empty:
            continue

        avg_grade = cluster_data["average_grade"].mean()
        avg_time = cluster_data["average_remaining_minutes"].mean()

        # Asignar nombre "inteligente"
        if avg_grade >= 8.5 and avg_time >= 3000:
            profile_name = "High performance and early submissions"
        elif avg_grade >= 7.0:
            profile_name = "Medium performance with on-time submissions"
        else:
            profile_name = "Low performance and late submissions"

        # Aquí el cambio importante:
        cluster_profiles[f"{profile_name} (Cluster {cluster_id})"] = {
            "total_students": cluster_data.shape[0],
            "students": cluster_data["student_name"].tolist()
        }

    return {
        "number_of_clusters": n_clusters,
        "cluster_profiles": cluster_profiles
    }

def train_or_update_performance_classifier(df, model_path="saved_model/model_performance_classifier.pkl"):
    """
    Trains or updates a performance classification model to predict student academic risk,
    providing detailed interpretation of predictions.

    Args:
        df (DataFrame): Flattened and processed activities DataFrame.
        model_path (str): Path where the model is saved.

    Returns:
        model (RandomForestClassifier): Trained or updated model.
        evaluation (dict): Detailed evaluation results.
    """
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
    import os
    import joblib

    # Step 1: Build the feature dataset
    student_summary = (
        df.groupby(["student_id", "student_name"])
        .agg(
            average_grade=("grade", "mean"),
            average_remaining_minutes=("remaining_minutes", "mean"),
            grade_std=("grade", "std"),
            total_activities=("grade", "count")
        )
        .fillna(0)
        .reset_index()
    )

    # Step 2: Define target variable (High Performer vs At Risk)
    student_summary["performance_label"] = student_summary["average_grade"].apply(
        lambda x: 1 if x >= 8.0 else 0  # 1 = High Performer, 0 = At Risk
    )

    # Step 3: Define features (X) and target (y)
    X = student_summary[["average_grade", "average_remaining_minutes", "grade_std", "total_activities"]]
    y = student_summary["performance_label"]

    # Step 4: Train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Step 5: Load or train the model
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        model.fit(X, y)  # Update the model
    else:
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)

    # Step 6: Evaluation
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)

    # Step 7: Predict probabilities on full data
    y_full_pred = model.predict(student_summary[["average_grade", "average_remaining_minutes", "grade_std", "total_activities"]])
    y_proba = model.predict_proba(student_summary[["average_grade", "average_remaining_minutes", "grade_std", "total_activities"]])

    students_predictions = []
    for idx, (pred_label, proba) in enumerate(zip(y_full_pred, y_proba)):
        students_predictions.append({
            "student_id": student_summary.iloc[idx]["student_id"],
            "student_name": student_summary.iloc[idx]["student_name"],
            "predicted_label": "High Performer" if pred_label == 1 else "At Risk",
            "probability": round(max(proba) * 100, 2)  # Highest class probability
        })

    total_students = len(students_predictions)
    total_high_performers = sum(1 for s in students_predictions if s["predicted_label"] == "High Performer")
    total_at_risk = sum(1 for s in students_predictions if s["predicted_label"] == "At Risk")

    evaluation = {
        "accuracy": round(accuracy, 2),
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2),
        "students_predictions": students_predictions,
        "summary": {
            "total_students_predicted": total_students,
            "total_high_performers": total_high_performers,
            "total_at_risk": total_at_risk
        }
    }

    # Step 8: Save updated model
    joblib.dump(model, model_path)

    return model, evaluation

def save_model(model, path="saved_model/model_remaining_minutes.pkl"):
    joblib.dump(model, path)
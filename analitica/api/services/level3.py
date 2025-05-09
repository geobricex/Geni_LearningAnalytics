import pandas as pd
from datetime import datetime
import json
from ..api_ai.openai_helper import interpret_analysis
from ..models.level3_model import train_or_update_academic_performance_model, classify_socioeconomic_risk, cluster_socioeconomic_profiles
from ..utils.utils import calculate_hash, start_timer, end_timer


def socioeconomic_summary(data, language):
    start_time = start_timer()  

    df = flatten_socioeconomic_data(data)
    df = calculate_age(df)
    correlations = extract_correlations(df)

    # Generación de predicciones y clusters
    performance_model, performance_results = train_or_update_academic_performance_model(df)
    risk_model, risk_results = classify_socioeconomic_risk(df)
    clusters = cluster_socioeconomic_profiles(df)

    summary = generate_groupings(df, correlations)
    summary["performance_prediction"] = performance_results
    summary["risk_classification"] = risk_results
    summary["clusters"] = clusters

    # Obtener la interpretación directamente como diccionario
    interpretation = interpret_analysis(summary, language, level="level3")

    # Verificar si la interpretación ya es un diccionario
    if not isinstance(interpretation, dict):
        try:
            # Intentar convertir la interpretación a diccionario
            interpretation = json.loads(interpretation)
        except json.JSONDecodeError:
            # Si falla, manejar el error
            interpretation = {
                "error": "Could not parse response as JSON",
                "raw_response": str(interpretation)
            }

    hash_value = calculate_hash({"summary": summary, "interpretation": interpretation})
    processing_time = end_timer(start_time) 

    metadata = {
        "processing_time": f"{processing_time} seconds",
        "language": language,
        "hash": hash_value
    }

    return [summary, interpretation, metadata]


def flatten_socioeconomic_data(data):
    rows = []
    for student in data:
        grades = [a["grade"] for a in student.get("activities", [])]
        average_grade = round(sum(grades) / len(grades), 2) if grades else 0
        max_grade = max(grades) if grades else 0
        min_grade = min(grades) if grades else 0
        income = student.get("family_income_monthly", 0)
        people_in_home = student.get("people_living_in_home", 1)
        dependents = student.get("dependents_count", 1)
        rooms = student.get("rooms_in_home", 1)

        # Formatear fecha de nacimiento como cadena si existe
        birth_date = student.get("birth_date")
        if birth_date:
            birth_date = str(pd.to_datetime(birth_date).date())

        rows.append({
            "student_id": student.get("student_id"),
            "student_name": student.get("student_name"),
            "birth_date": birth_date,  # Usar cadena en lugar de Timestamp
            "gender": student.get("gender"),
            "ethnicity": student.get("ethnicity"),
            "civil_status": student.get("civil_status"),
            "has_children": student.get("has_children"),
            "number_of_children": student.get("number_of_children", 0),
            "socioeconomic_level": student.get("socioeconomic_level"),
            "family_income_monthly": income,
            "people_living_in_home": people_in_home,
            "dependents_count": dependents,
            "income_per_capita": round(income / people_in_home, 2) if people_in_home else 0,
            "income_per_dependent": round(income / dependents, 2) if dependents else 0,
            "housing_ownership_status": student.get("housing_ownership_status"),
            "housing_condition": student.get("housing_condition"),
            "housing_type": student.get("housing_type"),
            "rooms_in_home": rooms,
            "zone_type": student.get("zone_type"),
            "has_internet_access": student.get("has_internet_access"),
            "device_type": student.get("device_type"),
            "employment_status": student.get("employment_status"),
            "commute_time_minutes": student.get("commute_time_minutes"),
            "accesses_last_7_days": student.get("accesses_last_7_days"),
            "total_connection_time_minutes": student.get("total_connection_time_minutes"),
            "resources_visited": student.get("resources_visited"),
            "forum_posts": student.get("forum_posts"),
            "average_grade": average_grade,
            "maximum_grade": max_grade,
            "minimum_grade": min_grade,
            "housing_density": round(people_in_home / rooms, 2) if rooms else 0
        })
    return pd.DataFrame(rows)

def convert_timestamps_to_str(data):
    """
    Convierte todos los valores de tipo Timestamp en el diccionario o DataFrame a cadenas.
    """
    if isinstance(data, pd.DataFrame):
        data = data.replace({pd.NaT: None})  # Reemplazar NaT por None
        for col in data.select_dtypes(include=['datetime', 'datetime64[ns]', 'Timestamp']).columns:
            data[col] = data[col].dt.strftime('%Y-%m-%d')
    elif isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, pd.Timestamp):
                data[key] = value.strftime('%Y-%m-%d')
            elif isinstance(value, dict):
                data[key] = convert_timestamps_to_str(value)
            elif isinstance(value, list):
                data[key] = [convert_timestamps_to_str(item) if isinstance(item, dict) else item for item in value]
    return data

def calculate_age(df):
    df["birth_date"] = pd.to_datetime(df["birth_date"], errors='coerce')
    df["calculated_age"] = df["birth_date"].apply(lambda x: datetime.now().year - x.year if pd.notnull(x) else None)
    return df

def compute_correlation(df, col1, col2):
    try:
        if df[col1].nunique() > 1 and df[col2].nunique() > 1:
            return round(df[col1].corr(df[col2]), 2)
    except:
        return None
    return None

def extract_correlations(df):
    return {
        "income_vs_average_grade": compute_correlation(df, "family_income_monthly", "average_grade"),
        "dependents_vs_average_grade": compute_correlation(df, "dependents_count", "average_grade"),
        "people_in_home_vs_average_grade": compute_correlation(df, "people_living_in_home", "average_grade"),
        "housing_density_vs_average_grade": compute_correlation(df, "housing_density", "average_grade"),
        "commute_time_vs_average_grade": compute_correlation(df, "commute_time_minutes", "average_grade"),
        "connection_time_vs_average_grade": compute_correlation(df, "total_connection_time_minutes", "average_grade"),
    }

def generate_groupings(df, correlations):
    student_details = []
    for _, row in df.iterrows():
        student_details.append({
            "student_id": row["student_id"],
            "student_name": row["student_name"],
            "socioeconomic_level": row["socioeconomic_level"],
            "family_income_monthly": row["family_income_monthly"],
            "income_per_capita": row["income_per_capita"],
            "employment_status": row["employment_status"],
            "device_type": row["device_type"],
            "has_internet_access": row["has_internet_access"],
            "commute_time_minutes": row["commute_time_minutes"],
            "accesses_last_7_days": row["accesses_last_7_days"],
            "total_connection_time_minutes": row["total_connection_time_minutes"],
            "resources_visited": row["resources_visited"],
            "forum_posts": row["forum_posts"],
            "average_grade": row["average_grade"],
            "risk_label": "At Risk" if row["average_grade"] < 7.0 else "Safe"
        })

    return {
        "student_details": student_details,
        "average_by_socioeconomic_level": df.groupby("socioeconomic_level")["average_grade"].mean().round(2).to_dict(),
        "average_by_employment_status": df.groupby("employment_status")["average_grade"].mean().round(2).to_dict(),
        "average_by_ethnicity": df.groupby("ethnicity")["average_grade"].mean().round(2).to_dict(),
        "average_by_civil_status": df.groupby("civil_status")["average_grade"].mean().round(2).to_dict(),
        "average_by_has_children": df.groupby("has_children")["average_grade"].mean().round(2).to_dict(),
        "average_by_device_type": df.groupby("device_type")["average_grade"].mean().round(2).to_dict(),
        "average_by_zone_type": df.groupby("zone_type")["average_grade"].mean().round(2).to_dict(),
        "average_by_internet_access": df.groupby("has_internet_access")["average_grade"].mean().round(2).to_dict(),
        "average_by_housing_condition": df.groupby("housing_condition")["average_grade"].mean().round(2).to_dict(),
        "average_by_housing_ownership_status": df.groupby("housing_ownership_status")["average_grade"].mean().round(2).to_dict(),
        "overall_average_age": round(df["calculated_age"].mean(), 2),
        "overall_average_income": round(df["family_income_monthly"].mean(), 2),
        "overall_average_income_per_capita": round(df["income_per_capita"].mean(), 2),
        "overall_average_housing_density": round(df["housing_density"].mean(), 2),
        "overall_average_connection_time": round(df["total_connection_time_minutes"].mean(), 2),
        "overall_average_commute_time": round(df["commute_time_minutes"].mean(), 2),
        "correlations": correlations
    }


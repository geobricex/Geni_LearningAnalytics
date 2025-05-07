import pandas as pd
from datetime import datetime
from ..api_ai.openai_helper import interpret_analysis

def socioeconomic_summary(data, language):
    df = flatten_socioeconomic_data(data)
    df = calculate_age(df)
    correlations = extract_correlations(df)
    summary = generate_groupings(df, correlations)

    interpretation = interpret_analysis(summary, language, level="level3")
    return [summary, interpretation]

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

        rows.append({
            "student_id": student.get("student_id"),
            "student_name": student.get("student_name"),
            "birth_date": student.get("birth_date"),
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
    return {
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

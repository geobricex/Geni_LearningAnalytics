import pandas as pd
from ..api_ai.openai_helper import interpret_analysis

def engagement_summary(data, language):
    df, df_activities = flatten_engagement(data)
    df = convert_dates(df)
    performance_stats = calculate_engagement_statistics(df)
    average_by_activity_type = get_average_by_activity_type(df_activities)
    top_3_students, below_average_students = get_top_and_below_average(df)
    at_risk_students = identify_students_at_risk_engagement(df)
    highest_participation, lowest_participation = get_extreme_participation(df)
    df = format_dates(df)

    summary = {
        "by_student": df.to_dict(orient="records"),
        "performance_statistics": performance_stats,
        "average_by_activity_type": average_by_activity_type,
        "top_3_students": top_3_students,
        "students_below_average": below_average_students,
        "highest_participation": highest_participation,
        "lowest_participation": lowest_participation,
        "students_at_risk": at_risk_students
    }

    summary = convert_summary_to_serializable(summary)

    interpretation = interpret_analysis(summary, language, level="level4")
    return [summary, interpretation]

def flatten_engagement(data):
    rows = []
    activity_details = []
    for student in data:
        avg_grade_last_3 = student.get("average_grade_last_3_activities", 0)
        activities = student.get("activities", [])
        for act in activities:
            activity_details.append({
                "student_id": student["student_id"],
                "student_name": student["student_name"],
                "type": act["type"],
                "grade": act["grade"]
            })
        rows.append({
            "student_id": student["student_id"],
            "student_name": student["student_name"],
            "average_grade_last_3_activities": avg_grade_last_3,
            "grade_trend": student.get("grade_trend"),
            "missed_activities": student.get("missed_activities", 0),
            "avg_time_per_connection": student.get("avg_time_per_connection", 0),
            "last_access_date": student.get("last_access_date"),
            "days_since_last_access": student.get("days_since_last_access", 0),
            "engagement_change": student.get("engagement_change"),
            "participation_slope": student.get("participation_slope", 0),
            "accesses_last_7_days": student.get("accesses_last_7_days", 0),
            "total_connection_time_minutes": student.get("total_connection_time_minutes", 0)
        })
    return pd.DataFrame(rows), pd.DataFrame(activity_details)

def convert_dates(df):
    df["last_access_date"] = pd.to_datetime(df["last_access_date"], errors="coerce")
    return df

def calculate_engagement_statistics(df):
    return {
        "overall_average": round(df["average_grade_last_3_activities"].mean(), 2),
        "mode": df["average_grade_last_3_activities"].mode().iloc[0] if not df["average_grade_last_3_activities"].mode().empty else None,
        "maximum": df["average_grade_last_3_activities"].max(),
        "minimum": df["average_grade_last_3_activities"].min(),
        "standard_deviation": round(df["average_grade_last_3_activities"].std(), 2),
        "quartile_1": round(df["average_grade_last_3_activities"].quantile(0.25), 2),
        "quartile_2": round(df["average_grade_last_3_activities"].quantile(0.5), 2),
        "quartile_3": round(df["average_grade_last_3_activities"].quantile(0.75), 2),
        "grade_trends": df["grade_trend"].value_counts().to_dict(),
        "engagement_changes": df["engagement_change"].value_counts().to_dict(),
        "average_time_per_connection": round(df["avg_time_per_connection"].mean(), 2),
        "average_participation_slope": round(df["participation_slope"].mean(), 2)
    }

def get_average_by_activity_type(df_activities):
    return df_activities.groupby("type")["grade"].mean().round(2).to_dict()

def get_top_and_below_average(df):
    top_3 = df.sort_values(by="average_grade_last_3_activities", ascending=False).head(3).to_dict(orient="records")
    below_average = df[df["average_grade_last_3_activities"] < 7].to_dict(orient="records")
    return top_3, below_average

def identify_students_at_risk_engagement(df):
    risk_df = df[
        (df["average_grade_last_3_activities"] < 7) |
        (df["accesses_last_7_days"] < 3) |
        (df["days_since_last_access"] >= 5) |
        (df["missed_activities"] >= 2) |
        (df["participation_slope"] < -10)
    ].copy()

    risk_df["last_access_date"] = risk_df["last_access_date"].astype(str)

    return risk_df[[
        "student_id", "student_name", "average_grade_last_3_activities",
        "accesses_last_7_days", "days_since_last_access",
        "missed_activities", "participation_slope", "last_access_date"
    ]].to_dict(orient="records")

def get_extreme_participation(df):
    highest = df.sort_values(by="participation_slope", ascending=False).head(3).to_dict(orient="records")
    lowest = df.sort_values(by="participation_slope", ascending=True).head(3).to_dict(orient="records")
    return highest, lowest

def format_dates(df):
    df["last_access_date"] = df["last_access_date"].astype(str)
    return df

def convert_summary_to_serializable(summary):
    def convert(obj):
        if isinstance(obj, pd.Timestamp):
            return obj.isoformat()
        elif isinstance(obj, dict):
            return {k: convert(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [convert(v) for v in obj]
        else:
            return obj
    return convert(summary)

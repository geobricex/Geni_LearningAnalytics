import pandas as pd
from ..api_ai.openai_helper import interpret_analysis

def interaction_summary(data, language):
    df = flatten_interaction(data)
    statistics = calculate_interaction_statistics(df)
    at_risk_students = identify_students_at_risk(df)
    no_forum_participation = students_with_no_forum_participation(df)
    few_resources = students_with_few_resources(df)

    summary = {
        "interaction_per_student": df.to_dict(orient="records"),
        "interaction_statistics": statistics,
        "students_at_risk": at_risk_students,
        "students_without_forum_participation": no_forum_participation,
        "students_with_few_resources": few_resources
    }

    interpretation = interpret_analysis(summary, language, level="level2")
    return [summary, interpretation]

def flatten_interaction(data):
    rows = []
    for student in data:
        student_id = student["student_id"]
        student_name = student["student_name"]
        accesses = student.get("accesses_last_7_days", 0)
        total_time = student.get("total_connection_time_minutes", 0)
        resources = student.get("resources_visited", 0)
        forum_posts = student.get("forum_posts", 0)
        activities = student.get("activities", [])
        grades = [a["grade"] for a in activities]

        total_activities = len(grades)
        average_grade = round(sum(grades) / total_activities, 2) if total_activities > 0 else 0
        min_grade = round(min(grades), 2) if grades else 0
        max_grade = round(max(grades), 2) if grades else 0

        time_per_access = round(total_time / accesses, 2) if accesses > 0 else 0
        time_per_activity = round(total_time / total_activities, 2) if total_activities > 0 else 0
        resources_per_activity = round(resources / total_activities, 2) if total_activities > 0 else 0
        forum_posts_per_activity = round(forum_posts / total_activities, 2) if total_activities > 0 else 0
        efficiency = round(average_grade / total_time, 4) if total_time > 0 else 0
        consistency = round(max_grade - min_grade, 2)

        rows.append({
            "student_id": student_id,
            "student_name": student_name,
            "accesses_last_7_days": accesses,
            "total_connection_time_minutes": total_time,
            "resources_visited": resources,
            "forum_posts": forum_posts,
            "total_activities": total_activities,
            "average_grade": average_grade,
            "minimum_grade": min_grade,
            "maximum_grade": max_grade,
            "time_per_access": time_per_access,
            "time_per_activity": time_per_activity,
            "resources_per_activity": resources_per_activity,
            "forum_posts_per_activity": forum_posts_per_activity,
            "efficiency": efficiency,
            "consistency": consistency
        })
    return pd.DataFrame(rows)

def calculate_interaction_statistics(df):
    return {
        "average_accesses": round(df["accesses_last_7_days"].mean(), 2),
        "average_connection_time": round(df["total_connection_time_minutes"].mean(), 2),
        "average_resources_visited": round(df["resources_visited"].mean(), 2),
        "average_forum_posts": round(df["forum_posts"].mean(), 2),
        "average_time_per_access": round(df["time_per_access"].mean(), 2),
        "average_time_per_activity": round(df["time_per_activity"].mean(), 2),
        "average_resources_per_activity": round(df["resources_per_activity"].mean(), 2),
        "average_forum_posts_per_activity": round(df["forum_posts_per_activity"].mean(), 2),
        "most_connected_student": df.loc[df["total_connection_time_minutes"].idxmax()]["student_name"],
        "most_forum_participation": df.loc[df["forum_posts"].idxmax()]["student_name"],
        "least_forum_participation": df.loc[df["forum_posts"].idxmin()]["student_name"]
    }

def identify_students_at_risk(df):
    at_risk = df[
        (df["accesses_last_7_days"] <= 2) &
        (df["average_grade"] < 7.0)
    ]
    return at_risk[["student_id", "student_name", "average_grade", "accesses_last_7_days"]].to_dict(orient="records")

def students_with_no_forum_participation(df):
    no_forum = df[df["forum_posts"] == 0]
    return no_forum[["student_id", "student_name", "forum_posts"]].to_dict(orient="records")

def students_with_few_resources(df):
    few = df[df["resources_visited"] < 3]
    return few[["student_id", "student_name", "resources_visited"]].to_dict(orient="records")

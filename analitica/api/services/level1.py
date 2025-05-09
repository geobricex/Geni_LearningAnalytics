import sys
import os
import pandas as pd
from datetime import datetime
from ..api_ai.openai_helper import interpret_analysis
from ..models.level1_model import train_or_update_model, cluster_students, train_or_update_performance_classifier
from ..utils.utils import calculate_hash, start_timer, end_timer

def academic_summary(data, language):
    start_time = start_timer()
    df = flatten_activities(data)
    df = calculate_minutes_remaining_delivery(df)  

    stats_globales = calculate_general_statistics(df)
    student_average = calculate_statistics_per_student(df)
    average_type = calculate_statistics_by_type(df)
    average_activity = calculate_statistics_by_activity(df)

    others = calculate_other_inputs(df, student_average, average_activity, stats_globales["overall_average"])

    model, evaluation_delivery = train_or_update_model(df)
    student_clustering = cluster_students(df)
    performance_model, evaluation_performance = train_or_update_performance_classifier(df)

    summary = {
        "global_statistics": {
            "number_of_students": df["student_id"].nunique(),
            "number_of_different_activities": df["activity_id"].nunique(),
            "overall_average": stats_globales["overall_average"],
            "median": stats_globales["median"],
            "mode": stats_globales["mode"],
            "standard_deviation": stats_globales["standard_deviation"],
            "variance": stats_globales["variance"],
            "range": stats_globales["range"],
            "quartile_1": stats_globales["q1"],
            "quartile_2": stats_globales["q2"],
            "quartile_3": stats_globales["q3"],
            "maximum_grade": others["maximum_grade"],
            "minimum_grade": others["minimum_grade"],
            "student_with_most_activities": others["student_with_most_activities"],
            "student_with_fewest_activities": others["student_with_fewest_activities"],
            "perfect_grades_10": df[df["grade"] == 10].shape[0],
            "failing_grades_below_7": df[df["grade"] < 7].shape[0],
            "distribution_by_intervals": others["distribution_by_intervals"],
            "distribution_by_activity_type": others["distribution_by_activity_type"],
            "total_activity_records": len(df),
            "submission_timing": {
            "average_remaining_minutes": round(df["remaining_minutes"].mean(), 2),
                "late_submission_percentage": round((df["remaining_minutes"] < 0).mean() * 100, 2),
                "late_submissions": int((df["remaining_minutes"] < 0).sum()),
                "early_submissions": int((df["remaining_minutes"] > 0).sum()),
                "earliest_submission": df.sort_values(by="remaining_minutes", ascending=False).head(1)[["student_name", "remaining_minutes"]].to_dict(orient="records")[0],
                "latest_submission": df.sort_values(by="remaining_minutes").head(1)[["student_name", "remaining_minutes"]].to_dict(orient="records")[0]
            }
        },
        "average_by_student": student_average.to_dict(orient="records"),
        "average_by_activity_type": average_type.to_dict(orient="records"),
        "average_by_activity": average_activity.to_dict(orient="records"),
        "top_3_students": others["top_3_students"],
        "students_below_overall_average": others["students_below_overall_average"],
        "activity_with_highest_average": others["activity_with_highest_average"],
        "activity_with_lowest_average": others["activity_with_lowest_average"],
        "average_by_activity_type_per_student": others["average_by_activity_type_per_student"],
        "average_by_submission_day": others["average_by_submission_day"],
        "variance_by_activity_type": others["variance_by_activity_type"],
        "dispersion_by_activity": others["dispersion_by_activity"],

        "delivery_time_prediction": {
            "rmse": evaluation_delivery["rmse"],
            "mae": evaluation_delivery["mae"],
            "example_predictions": evaluation_delivery["sample_predictions"],
        "student_clustering": student_clustering,
        "performance_prediction": evaluation_performance

}

    }

    #interpretation = '{}'
    interpretation = interpret_analysis(summary, language, level="level1")
    hash_value = calculate_hash({"summary": summary, "interpretation": interpretation})
    processing_time = end_timer(start_time) 
    metadata = {
        "processing_time": f"{processing_time} seconds",
        "language": language,
        "hash": hash_value
    }

    return ([summary, interpretation, metadata])  


def flatten_activities(data):
    rows = []
    for student in data:
        for activity in student["activities"]:
            rows.append({
                "student_id": student["student_id"],
                "student_name": student["student_name"],
                "course_id": student["course_id"],
                "course_name": student["course_name"],
                "activity_id": activity["activity_id"],
                "activity_type": activity["type"],
                "activity_title": activity["title"],
                "grade": round(activity["grade"], 2),
                "max_grade": round(activity["max_grade"], 2),
                "submission_date": activity["submission_date"],
                "submission_final_date": activity["submission_final_date"],
                "observation": activity["observation"]
            })
    return pd.DataFrame(rows)

def calculate_general_statistics(df):
    return {
        "overall_average": round(df["grade"].mean(), 2),
        "median": round(df["grade"].median(), 2),
        "mode": round(df["grade"].mode().iloc[0], 2) if not df["grade"].mode().empty else None,
        "standard_deviation": round(df["grade"].std(), 2),
        "variance": round(df["grade"].var(), 2),
        "range": round(df["grade"].max() - df["grade"].min(), 2),
        "q1": round(df["grade"].quantile(0.25), 2),
        "q2": round(df["grade"].quantile(0.5), 2),
        "q3": round(df["grade"].quantile(0.75), 2)
    }

def calculate_statistics_per_student(df):
    return (
        df.groupby(["student_id", "student_name"])
        .agg(
            total_activities=("grade", "count"),
            average=("grade", lambda x: round(x.mean(), 2)),
            minimum_grade=("grade", "min"),
            maximum_grade=("grade", "max"),
            average_remaining_minutes=("remaining_minutes", lambda x: round(x.mean(), 2))
        )
        .reset_index()
        .sort_values(by="student_name")
    )

def calculate_statistics_by_type(df):
    return (
        df.groupby("activity_type")
        .agg(
            total=("grade", "count"),
            average=("grade", lambda x: round(x.mean(), 2)),
            minimum=("grade", "min"),
            maximum=("grade", "max"),
            average_remaining_minutes=("remaining_minutes", lambda x: round(x.mean(), 2))
        )
        .reset_index()
    )

def calculate_statistics_by_activity(df):
    return (
        df.groupby("activity_title")
        .agg(
            total=("grade", "count"),
            average=("grade", lambda x: round(x.mean(), 2)),
            minimum=("grade", "min"),
            maximum=("grade", "max"),
            average_remaining_minutes=("remaining_minutes", lambda x: round(x.mean(), 2))
        )
        .reset_index()
    )

def calculate_minutes_remaining_delivery(df):
    df["submission_date"] = pd.to_datetime(df["submission_date"], errors="coerce")
    df["submission_final_date"] = pd.to_datetime(df["submission_final_date"], errors="coerce")

    df["remaining_minutes"] = (df["submission_final_date"] - df["submission_date"]).dt.total_seconds() / 60.0
    df["remaining_minutes"] = df["remaining_minutes"].round(2)

    return df

def calculate_other_inputs(df, student_average, average_by_activity, overall_average):
    max_grade = df.loc[df["grade"].idxmax()][["student_name", "grade"]].to_dict()
    min_grade = df.loc[df["grade"].idxmin()][["student_name", "grade"]].to_dict()

    activities_per_student = df["student_name"].value_counts()
    student_with_most = {
        "name": activities_per_student.idxmax(),
        "total_activities": int(activities_per_student.max())
    }
    student_with_fewest = {
        "name": activities_per_student.idxmin(),
        "total_activities": int(activities_per_student.min())
    }

    top_3_students = student_average.sort_values(by="average", ascending=False).head(3)
    students_below_average = student_average[student_average["average"] < overall_average]

    activity_highest_average = average_by_activity.sort_values(by="average", ascending=False).head(1).to_dict(orient="records")[0]
    activity_lowest_average = average_by_activity.sort_values(by="average", ascending=True).head(1).to_dict(orient="records")[0]

    df["grade_interval"] = pd.cut(df["grade"], bins=[0, 5.99, 6.99, 7.99, 8.99, 10],
                                  labels=["<6", "6-6.99", "7-7.99", "8-8.99", "9-10"])
    distribution_by_intervals = df["grade_interval"].value_counts().sort_index().to_dict()
    distribution_by_activity_type = df["activity_type"].value_counts().to_dict()

    average_by_type_per_student = (
        df.groupby(["student_name", "activity_type"])["grade"]
        .mean().round(2).reset_index()
        .pivot(index="student_name", columns="activity_type", values="grade")
        .fillna(0).to_dict(orient="index")
    )

    df["submission_date_only"] = pd.to_datetime(df["submission_date"]).dt.date
    average_by_submission_day = df.groupby("submission_date_only")["grade"].mean().round(2)
    average_by_submission_day = {str(k): v for k, v in average_by_submission_day.items()}

    variance_by_activity_type = df.groupby("activity_type")["grade"].var().round(2).to_dict()

    dispersion_by_activity = (
        df.groupby("activity_title")["grade"]
        .agg(["count", "var"])
        .dropna()
        .sort_values(by="var", ascending=False)
        .round(2)
        .head(5)
        .reset_index()
        .to_dict(orient="records")
    )

    return {
        "maximum_grade": max_grade,
        "minimum_grade": min_grade,
        "student_with_most_activities": student_with_most,
        "student_with_fewest_activities": student_with_fewest,
        "top_3_students": top_3_students.to_dict(orient="records"),
        "students_below_overall_average": students_below_average.to_dict(orient="records"),
        "activity_with_highest_average": activity_highest_average,
        "activity_with_lowest_average": activity_lowest_average,
        "distribution_by_intervals": distribution_by_intervals,
        "distribution_by_activity_type": distribution_by_activity_type,
        "average_by_activity_type_per_student": average_by_type_per_student,
        "average_by_submission_day": average_by_submission_day,
        "variance_by_activity_type": variance_by_activity_type,
        "dispersion_by_activity": dispersion_by_activity
    }



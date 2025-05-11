// info-level3.component.ts
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-info-level3',
    templateUrl: './info-level3.component.html',
    styleUrls: ['./info-level3.component.css'],
    standalone: true,
    imports: [TableModule, CardModule, TabViewModule,],
})
export class InfoLevel3Component {

SchemaLevel3_1: string = `{
    "student_id": "A202501",
    "student_name": "Jeniffer López Aguiar",
    "age": 21,
    "gender": "femenino",
    "has_internet_access": true,
    "device_type": "laptop",
    "previous_school_type": "pública",
    "parents_education_level": "secundaria completa",
    "receives_scholarship": true,
    "socioeconomic_level": "medio",
    "family_income_monthly": 2100,
    "dependents_count": 4,
    "employment_status": "trabaja medio tiempo",
    "housing_type": "arrendada",
    "zone_type": "urbana",
    "birth_date": "1999-09-27",
    "civil_status": "soltera",
    "ethnicity": "mestiza",
    "has_children": false,
    "number_of_children": 0,
    "housing_ownership_status": "propia",
    "housing_condition": "adecuada",
    "people_living_in_home": 5,
    "rooms_in_home": 3,
    "commute_time_minutes": 15,
    "course_id": "INF101",
    "course_name": "Fundamentos de Programación",
    "accesses_last_7_days": 6,
    "total_connection_time_minutes": 320,
    "resources_visited": 15,
    "forum_posts": 3,
    "activities": [
      {
        "activity_id": "ACT01",
        "type": "quiz",
        "title": "Quiz 1: Tipos de Datos",
        "grade": 9.5,
        "max_grade": 10,
        "submission_date": "2025-04-01T14:00:00Z",
        "observation": "Dominio claro del tema"
      }
    ]
  }`;

  SchemaLevel3_2: string = `{
    "by_student": [
      { "student": "Jennifer Lopez Aguiar", "average": 8.9, "income_per_capita": 525, "housing_density": 1.67 },
      { "student": "Charles Rivera", "average": 7.3, "income_per_capita": 350, "housing_density": 2.0 }
    ],
    "analyticalSummary": {
      "averageIncome": 1800,
      "correlations": {
        "incomeVsAverage": 0.45,
        "dependentsVsGrade": -0.30,
        "connectionTimeVsPerformance": 0.60
      },
      "groupedAverages": {
        "highIncome": 8.5,
        "lowIncome": 7.0,
        "Urban": 8.0,
        "Rural": 7.5
      }
    }
  }`;

  SchemaLevel3_3: string = `{
    "by_student": [
      { "student": "Jennifer Lopez Aguiar", "average": 8.9, "income_per_capita": 525, "housing_density": 1.67 },
      { "student": "Charles Rivera", "average": 7.3, "income_per_capita": 350, "housing_density": 2.0 }
    ],
    "analyticalSummary": {
      "averageIncome": 1800,
      "correlations": {
        "incomeVsAverage": 0.77,
        "dependentsVsAverage": -0.82,
        "densityVsAverage": 0.62,
        "commuteVsAverage": -1.0,
        "connectionTimeVsAverage": 0.99
      },
      "groupedAverages": {
        "highIncome": 8.5,
        "lowIncome": 7.0,
        "Urban": 8.0,
        "Rural": 7.5,
        "Laptop": 8.8,
        "NoInternet": 6.5
      }
    }
  }`;
}

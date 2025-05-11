// info-level1.component.ts
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-info-level1',
    templateUrl: './info-level1.component.html',
    styleUrls: ['./info-level1.component.css'],
    standalone: true,
    imports: [TableModule, CardModule, TabViewModule,],
})
export class InfoLevel1Component {

 SchemaLevel1_1: string = `{
    "student_id": "A202501",
    "student_name": "Jeniffer López Aguiar",
    "course_id": "INF101",
    "course_name": "Fundamentos de Programación",
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

   SchemaLevel1_2: string = `{
    "global_statistics": { ... },
    "average_per_student": [ ... ],
    "average_per_activity_type": [ ... ],
    "average_per_activity": [ ... ],
    "top_3_students": [ ... ],
    "best_average_activity": { ... }
  }`;

  SchemaLevel1_3: string = `{
    "global_statistics": { "average": 8.5, "median": 8.7, "mode": 9.0 },
    "individual_performance": [ { "student": "John Doe", "average": 9.2 }, { "student": "Jane Smith", "average": 8.3 } ],
    "activity_analysis": [ { "type": "quiz", "average": 8.0 }, { "type": "forum", "average": 9.0 } ],
    "temporal_analysis": { "2025-04-01": 8.5, "2025-04-02": 9.0 },
    "dispersion_analysis": { "quiz": 0.5, "forum": 0.2 },
    "key_cases": { "top_students": ["John Doe", "Jane Smith"], "at_risk": ["Mark Lee"] }
  }`;
}

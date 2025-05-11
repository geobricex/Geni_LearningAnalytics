// info-level1.component.ts
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-info-level2',
    templateUrl: './info-level2.component.html',
    styleUrls: ['./info-level2.component.css'],
    standalone: true,
    imports: [TableModule, CardModule, TabViewModule,],
})
export class InfoLevel2Component {

    SchemaLevel2_1: string = `{
"student_id": "A202501",
    "student_name": "Jeniffer López Aguiar",
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

    SchemaLevel2_2: string = `{
    "interaccion_por_estudiante": [ { "student": "John Doe", "average": 8.5, "accesses": 12, "forum_posts": 3, "resources_visited": 5 } ],
    "estadisticas_interaccion": { "average_accesses": 10, "average_connection_time": 300 },
    "estudiantes_en_riesgo": [ "Mark Lee" ],
    "estudiantes_sin_participacion_foros": [ "Anna Smith" ],
    "estudiantes_con_pocos_recursos": [ "Liam Brown" ]
  }`;

    SchemaLevel2_3: string = `{
    "general_statistics": { "average_accesses": 8, "average_time": 300, "resources_per_activity": 5, "forum_posts_per_activity": 2 },
    "individual_interaction": [ { "student": "Nara Boza Arzube", "connection_time": 500, "forum_posts": 10 }, { "student": "Juan Carlos Caviedes", "connection_time": 100, "forum_posts": 1 } ],
    "critical_cases": { "at_risk": ["Juan Carlos Caviedes"], "no_forum_participation": ["Liam Brown"] },
    "highlighted_cases": { "most_connected": "Nara Boza Arzube", "least_connected": "Juan Carlos Caviedes" }
  }`;
}

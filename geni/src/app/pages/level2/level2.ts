import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { environment } from '../../../environments/environment';

interface Student {
  student_id: string;
  student_name: string;
  course_id: string;
  course_name: string;
  accesses_last_7_days: number;
  total_connection_time_minutes: number;
  resources_visited: number;
  forum_posts: number;
  activities: Activity[];
}

interface Activity {
  activity_id: string;
  type: string;
  title: string;
  grade: number;
  max_grade: number;
  submission_date: string;
  submission_final_date: string;
  observation: string;
}

interface StudentPerformance {
  student_id: string;
  student_name: string;
  average_grade: number;
  total_activities: number;
  interaction_cluster: number;
  predicted_performance: string;
}

interface InteractionCluster {
  total_students: number;
  average_accesses: number;
  average_resources: number;
  average_forum_posts: number;
  students: StudentPerformance[];
}

interface RiskPrediction {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  students_predictions: {
    student_id: string;
    student_name: string;
    predicted_label: string;
  }[];
}

interface AnalysisResult {
  interaction_statistics: any;
  student_performance: StudentPerformance[];
  interaction_per_student: StudentPerformance[];
  students_at_risk: any[];
  students_without_forum_participation: any[];
  students_with_few_resources: any[];
  interaction_time_prediction: any;
  interaction_clusters: any;
  interaction_risk_prediction: any;

  // Campos adicionales para las descripciones textuales
  interaction_per_student_text: string;
  interaction_statistics_text: string;
  students_at_risk_text: string;
  students_without_forum_participation_text: string;
  students_with_few_resources_text: string;
  interaction_time_prediction_text: string;
  interaction_clusters_text: string;
  interaction_risk_prediction_text: string;
}


@Component({
  selector: 'app-level2',
  standalone: true,
  templateUrl: './level2.component.html',
  imports: [CommonModule, TableModule, CardModule, TabViewModule, ButtonModule, HttpClientModule, DialogModule, NgxChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class Level2 implements OnInit {
  studentsData: Student[] = [];
  groupedData: any[] = [];
  selectedStudent: Student | null = null;
  showDialog: boolean = false;
  rawDataXML: string = '';
  analysisResult: AnalysisResult[] = [];
  studentPerformanceData: StudentPerformance[] = [];
  accessDistributionChart: any[] = [];
  activityParticipationChart: any[] = [];
  chartColorScheme = 'cool';  // Puedes elegir entre 'vivid', 'natural', 'cool', etc.
  private apiUrl = environment.apiUrl;
  private production = environment.production;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadStudentsData();
  }

  analyzeLevel2() {

    if (this.production) {
      this.http.post<AnalysisResult[]>(`${this.apiUrl}/level2/`, this.studentsData).subscribe({
        next: (res) => {
          this.analysisResult = res;
                if (this.analysisResult.length > 0) {
              this.processPerformanceData(res[0]);
              this.prepareCharts(res[0]);
            } else {
              console.warn('El análisis no contiene datos válidos.');
            }
        },
        error: (err) => console.error('❌ Error al llamar a la API de Nivel 2:', err)
      });
    } else {
      setTimeout(() => {
        this.http.get<AnalysisResult[]>('assets/data/response/level2-response.json').subscribe({
          next: (mock) => {
            this.analysisResult = mock;
            if (this.analysisResult.length > 0) {
              this.processPerformanceData(mock[0]);
              this.prepareCharts(mock[0]);
            } else {
              console.warn('El análisis no contiene datos válidos.');
            }
          },
          error: (err) => console.error('❌ No se pudo cargar la respuesta simulada:', err)
        });
      }, 2000);
    }

  }

  loadStudentsData(): void {
    this.http.get<Student[]>('assets/data/json/level2.json').subscribe(data => {
      this.studentsData = data;
      this.groupedData = this.flattenData(data);
    });

    this.http.get('assets/data/xml/level1.xml', { responseType: 'text' }).subscribe((dataXML) => {
      this.rawDataXML = dataXML;
    });

  }

  openDetail(student: Student): void {
    this.selectedStudent = student;
    this.showDialog = true;
  }

  flattenData(data: Student[]): any[] {
    return data.flatMap(student =>
      student.activities.map(activity => ({
        student_name: student.student_name,
        ...activity
      }))
    );
  }

  prepareCharts(data: AnalysisResult): void {
    console.log('Preparando gráficos con datos:', data);

    // Verificar si el objeto "interaction_clusters" está definido
    if (data.interaction_clusters) {
      this.accessDistributionChart = [
        { name: 'Low Access', value: data.interaction_clusters['Cluster 0']?.total_students || 0 },
        { name: 'Medium Access', value: data.interaction_clusters['Cluster 2']?.total_students || 0 },
        { name: 'High Access', value: data.interaction_clusters['Cluster 1']?.total_students || 0 }
      ];
      console.log('Datos para gráfico de acceso:', this.accessDistributionChart);
    } else {
      console.warn('El objeto interaction_clusters no está definido en los datos.');
    }

    // Verificar si "interaction_statistics" contiene los datos esperados
    if (data.interaction_statistics) {
      this.activityParticipationChart = [
        { name: 'Participated', value: data.interaction_statistics.average_forum_posts || 0 },
        { name: 'Not Participated', value: (data.interaction_statistics.average_forum_posts || 0) * 0.5 }
      ];
      console.log('Datos para gráfico de participación:', this.activityParticipationChart);
    } else {
      console.warn('El objeto interaction_statistics no está definido en los datos.');
    }
  }


  // Procesa el rendimiento de los estudiantes
  processPerformanceData(data: AnalysisResult): void {
    this.studentPerformanceData = data.interaction_per_student.map((student: StudentPerformance) => ({
      student_id: student.student_id,
      student_name: student.student_name,
      average_grade: student.average_grade,
      total_activities: student.total_activities,
      interaction_cluster: student.interaction_cluster,
      predicted_performance: student.interaction_cluster === 1 ? 'High' : 'Low'
    }));
  }
}
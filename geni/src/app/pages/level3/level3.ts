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

interface Student {
  student_id: string;
  student_name: string;
  age: number;
  gender: string;
  has_internet_access: boolean;
  device_type: string;
  previous_school_type: string;
  parents_education_level: string;
  receives_scholarship: boolean;
  socioeconomic_level: string;
  family_income_monthly: number;
  dependents_count: number;
  employment_status: string;
  housing_type: string;
  zone_type: string;
  birth_date: string;
  civil_status: string;
  ethnicity: string;
  has_children: boolean;
  number_of_children: number;
  housing_ownership_status: string;
  housing_condition: string;
  people_living_in_home: number;
  rooms_in_home: number;
  commute_time_minutes: number;
  course_id: string;
  course_name: string;
  accesses_last_7_days: number;
  total_connection_time_minutes: number;
  resources_visited: number;
  forum_posts: number;
}

interface StudentPerformance {
  student_id: string;
  student_name: string;
  average_grade: number;
  income_per_capita: number;
  employment_status: string;
  risk_label: string;
}

interface Cluster {
  cluster_id: string;
  total_students: number;
  average_grade: number;
  average_income: number;
  students: { student_id: string; student_name: string }[];
}

interface Prediction {
  student_id: string;
  student_name: string;
  predicted_grade: number;
}

interface RiskPrediction {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  students_predictions: {
    student_id: string;
    student_name: string;
    predicted_risk: string;
  }[];
}

interface AnalysisResult {
  overall_average_income: number;
  overall_average_income_per_capita: number;
  overall_average_age: number;
  overall_average_commute_time: number;
  overall_average_housing_density: number;
  overall_average_connection_time: number;
  correlations: any;
  student_performance: StudentPerformance[]; 
  student_details: StudentPerformance[];      
  demographic_distribution: string;
  economic_status: string;
  technology_access: string;
  correlations_found: string;
  suggested_interventions: string;
  clusters: { [key: string]: Cluster };        
  performance_prediction: {
    predictions: Prediction[];
  };
  risk_classification: RiskPrediction;
  average_by_socioeconomic_level: { [key: string]: number }; 
  average_by_employment_status: { [key: string]: number };   
}


@Component({
  selector: 'app-level3',
  standalone: true,
  templateUrl: './level3.component.html',
  imports: [CommonModule, TableModule, CardModule, TabViewModule, ButtonModule, HttpClientModule, DialogModule, NgxChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class Level3 implements OnInit {
  studentsData: Student[] = [];
  selectedStudent: Student | null = null;
  showDialog: boolean = false;
  rawDataXML: string = '';  
  analysisResult: AnalysisResult[] = [];
  studentPerformanceData: StudentPerformance[] = [];
  clusterData: Cluster[] = [];
  predictionData: Prediction[] = [];
  riskData: RiskPrediction = {
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1_score: 0,
    students_predictions: []
  };
  incomeDistributionChart: any[] = [];
  gradeDistributionChart: any[] = [];
  chartColorScheme = 'cool';
  correlationChart: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudentsData();
  }

  loadStudentsData(): void {
    this.http.get<Student[]>('assets/data/json/level3.json').subscribe(data => {
      this.studentsData = data;
    });
    this.http.get('assets/data/xml/level1.xml', { responseType: 'text' }).subscribe((dataXML) => {
      this.rawDataXML = dataXML;
    });
  }

  openDetail(student: Student): void {
    this.selectedStudent = student;
    this.showDialog = true;
  }

analyzeLevel3() {
    setTimeout(() => {
        this.http.get<AnalysisResult[]>('assets/data/response/level3-response.json').subscribe({
            next: (mock) => {
                this.analysisResult = mock;
                console.log('✅ Level 3 analysis loaded:', this.analysisResult);

                if (this.analysisResult.length > 0) {
                    const data = mock[0];
                    this.processPerformanceData(data);
                    this.processClusterData(data);
                    this.processPredictionData(data);
                    this.processRiskData(data);
                    this.prepareCharts(data);
                } else {
                    console.warn('No valid data for analysis.');
                }
            },
            error: (err) => console.error('❌ Failed to load Level 3 data:', err)
        });
    }, 2000);

    // this.http.post<AnalysisResult[]>('http://localhost:8000/api/level3/', this.rawData).subscribe({
    //   next: (res) => {
    //     this.analysisResult = res;
    //     this.processPerformanceData(res[0]);
    //     this.prepareCharts(res[0]);
    //     console.log('✅ Análisis de Nivel 2 obtenido desde la API.');
    //   },
    //   error: (err) => console.error('❌ Error al llamar a la API de Nivel 2:', err)
    // });
  }

processPerformanceData(data: AnalysisResult): void {
    if (Array.isArray(data.student_details) && data.student_details.length > 0) {
        this.studentPerformanceData = data.student_details.map((student: StudentPerformance) => ({
            student_id: student.student_id,
            student_name: student.student_name,
            average_grade: student.average_grade || 0,
            income_per_capita: student.income_per_capita || 0,
            employment_status: student.employment_status || 'Unknown',
            risk_label: student.risk_label || 'Unknown'
        }));
        console.log('✅ Student performance data processed:', this.studentPerformanceData);
    } else {
        console.warn('⚠️ No valid student performance data.');
        this.studentPerformanceData = [];
    }
}

processClusterData(data: AnalysisResult): void {
    if (data.clusters) {
        this.clusterData = Object.keys(data.clusters).map(clusterId => ({
            cluster_id: clusterId,
            total_students: data.clusters[clusterId].total_students,
            average_grade: data.clusters[clusterId].average_grade,
            average_income: data.clusters[clusterId].average_income,
            students: data.clusters[clusterId].students
        }));
        console.log('✅ Cluster data processed:', this.clusterData);
    } else {
        console.warn('⚠️ No cluster data available.');
        this.clusterData = [];
    }
}


processPredictionData(data: AnalysisResult): void {
    if (data.performance_prediction && data.performance_prediction.predictions) {
        this.predictionData = data.performance_prediction.predictions;
        console.log('✅ Performance predictions processed:', this.predictionData);
    } else {
        console.warn('⚠️ No performance prediction data.');
        this.predictionData = [];
    }
}

processRiskData(data: AnalysisResult): void {
    if (data.risk_classification) {
        this.riskData = data.risk_classification;
        console.log('✅ Risk classification data processed:', this.riskData);
    } else {
        console.warn('⚠️ No risk classification data.');
        this.riskData = {
            accuracy: 0,
            precision: 0,
            recall: 0,
            f1_score: 0,
            students_predictions: []
        };
    }
}

prepareCharts(data: AnalysisResult): void {
    // Gráfico de distribución de ingresos por nivel socioeconómico
    if (data.average_by_socioeconomic_level) {
        this.incomeDistributionChart = Object.keys(data.average_by_socioeconomic_level).map(level => ({
            name: level.charAt(0).toUpperCase() + level.slice(1),
            value: data.average_by_socioeconomic_level[level]
        }));
    } else {
        console.warn('⚠️ No income distribution data available.');
        this.incomeDistributionChart = [];
    }

    // Gráfico de distribución de calificaciones por estado laboral
    if (data.average_by_employment_status) {
        this.gradeDistributionChart = Object.keys(data.average_by_employment_status).map(status => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: data.average_by_employment_status[status]
        }));
    } else {
        console.warn('⚠️ No grade distribution data available.');
        this.gradeDistributionChart = [];
    }

    // Gráfico de correlación
    if (data.correlations) {
        this.correlationChart = Object.keys(data.correlations).map(key => ({
            name: key.replace(/_/g, ' ').replace(/vs/g, 'vs.').toUpperCase(),
            value: data.correlations[key] || 0
        }));
    } else {
        console.warn('⚠️ No correlation data available.');
        this.correlationChart = [];
    }

    console.log('✅ Charts prepared:', {
        incomeDistributionChart: this.incomeDistributionChart,
        gradeDistributionChart: this.gradeDistributionChart,
        correlationChart: this.correlationChart
    });
}
 
}

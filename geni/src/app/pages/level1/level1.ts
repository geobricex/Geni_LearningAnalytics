import { Component, OnInit, ViewEncapsulation, Renderer2, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-level1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TableModule, CardModule, TabViewModule, ButtonModule,
    DialogModule, DynamicDialogModule, HttpClientModule, NgxChartsModule],
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Level1 implements OnInit {

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef

  ) { }

  showDialog: boolean = false;
  selectedStudent: any = null;
  rawData: any[] = [];
  rawDataXML: string = '';
  analysisResult: any[] = [];

  flattenedData: any[] = [];
  excelData: any[] = [];
  wordCloudData: WordData[] = [];

  // Configuración de colores para las gráficas
  chartTheme: any;
  chartColorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit(): void {
    // Actualizar configuración de tema para las gráficas
    this.setupChartTheme();

    // Escuchar cambios de tema
    this.listenForThemeChanges();

    this.loadStudentsData();
  }

  loadStudentsData(): void {
    this.http.get<any[]>('assets/data/json/level1.json').subscribe((data) => {
      this.rawData = data;

      this.flattenedData = this.rawData.flatMap((student: any) =>
        student.activities.map((activity: any) => ({
          student_id: student.student_id,
          student_name: student.student_name,
          course_id: student.course_id,
          course_name: student.course_name,
          ...activity
        }))
      );

      this.buildExpandedStudentData();
    });

    // Cargar XML como texto
    this.http.get('assets/data/xml/level1.xml', { responseType: 'text' }).subscribe((dataXML) => {
      this.rawDataXML = dataXML;
    });
  }

  // Configura el tema para las gráficas basado en el tema actual
  setupChartTheme() {
    const isDarkTheme = this.document.documentElement.classList.contains('dark-theme');

    // Configuración de colores para textos y ejes
    this.chartTheme = {
      axisLabelColor: isDarkTheme ? 'white' : 'black',
      textColor: isDarkTheme ? 'white' : 'black',
      gridLineColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
    };
  }

  // Escucha cambios de tema en la aplicación
  listenForThemeChanges() {
    // Observer para detectar cambios en las clases del documento
    const observer = new MutationObserver(() => {
      this.setupChartTheme();
    });

    // Observar cambios en la clase del elemento raíz (donde se agrega/quita 'dark-theme')
    observer.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  openDialog(student: any) {
    this.selectedStudent = student;
    this.showDialog = true;
  }

  analyzeLevel1() {
    setTimeout(() => {
      this.http.get<any[]>('assets/data/response/level1-response.json').subscribe({
        next: (mock) => {
          this.analysisResult = mock;
          this.buildExpandedStudentData();
          this.buildDashboardCharts();
        },
        error: (err) => console.error('❌ Could not load mock response:', err)
      });
    }, 2000);

    // this.http.post<any[]>('http://localhost:8000/api/level1/', this.rawData).subscribe({
    //   next: (res) => {
    //     this.analysisResult = res;
    //     this.buildExpandedStudentData();
    //     this.buildDashboardCharts();
    //     //console.log(this.analysisResult);
    //   },
    //   error: (err) => {
    //     console.error('❌ Error calling API:', err);
    //   }
    // });
  }

  expandedStudentData: any[] = [];

  private buildExpandedStudentData() {
    const studentAverages = this.analysisResult[0]?.average_by_student || [];
    const clusteringProfiles = this.analysisResult[0]?.delivery_time_prediction?.student_clustering?.cluster_profiles || {};
    const performancePredictions = this.analysisResult[0]?.delivery_time_prediction?.performance_prediction?.students_predictions || [];

    const findCluster = (studentName: string) => {
      for (const [clusterName, clusterData] of Object.entries(clusteringProfiles)) {
        if ((clusterData as any)?.students?.includes(studentName)) {
          return clusterName;
        }
      }
      return 'No cluster assigned';
    };

    const findPerformance = (studentId: string) => {
      const found = performancePredictions.find((s: any) => s.student_id === studentId);
      if (found) {
        return {
          predicted_label: found.predicted_label,
          probability: found.probability
        };
      }
      return {
        predicted_label: 'No prediction available',
        probability: 'N/A'
      };
    };

    this.expandedStudentData = studentAverages.map((student: any) => {
      const clusterName = findCluster(student.student_name);
      const performance = findPerformance(student.student_id);

      return {
        ...student,
        cluster_profile: clusterName,
        predicted_performance: performance.predicted_label,
        performance_probability: performance.probability,
        activities: student.activities || []
      };
    });

    this.prepareWordCloudData();
  }

  gradeDistributionChart: any[] = [];
  activityTypeChart: any[] = [];
  submissionTimingChart: any[] = [];

  private buildDashboardCharts() {
    const distribution = this.analysisResult[0]?.global_statistics?.distribution_by_intervals || {};
    this.gradeDistributionChart = [
      {
        "name": "Grade Distribution",
        "series": Object.entries(distribution).map(([interval, count]) => ({
          "name": interval,
          "value": count
        }))
      }
    ];

    const activityTypes = this.analysisResult[0]?.global_statistics?.distribution_by_activity_type || {};
    this.activityTypeChart = Object.entries(activityTypes).map(([type, count]) => ({
      "name": type,
      "series": [
        {
          "name": type,
          "value": count
        }
      ]
    }));

    const studentsTiming = this.analysisResult[0]?.global_statistics?.submission_timing || {};
    this.submissionTimingChart = [
      {
        name: "Average Remaining Minutes",
        series: [
          { name: "Average", value: studentsTiming.average_remaining_minutes }
        ]
      }
    ];
  }

  downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/data/xlsx/level1.xlsx';
    link.download = 'level1.xlsx';
    link.target = '_blank';
    link.click();
  }

  loadExcelFile() {
    const url = 'assets/data/xlsx/level1.xlsx';
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.excelData = XLSX.utils.sheet_to_json(worksheet);
      })
      .catch(error => {
        console.error('❌ Error loading Excel file:', error);
      });
  }

  getExcelColumns(): string[] {
    if (this.excelData.length > 0) {
      return Object.keys(this.excelData[0]);
    }
    return [];
  }

  stopWordsSpanish = [
    'el', 'la', 'los', 'las', 'de', 'y', 'a', 'que', 'en', 'con', 'por', 'para', 'una', 'un', 'se', 'al', 'del', 'como', 'es', 'no', 'si', 'muy', 'sobre', 'este', 'esta'
  ];

  stopWordsEnglish = [
    'the', 'and', 'to', 'a', 'in', 'of', 'is', 'it', 'with', 'for', 'on', 'that', 'as', 'at', 'by', 'an', 'this', 'be', 'are', 'was', 'were', 'not'
  ];

  // Mapa para almacenar los colores generados una sola vez
  private colorMap: { [key: string]: string } = {};

  private prepareWordCloudData() {
    const allObservations = this.rawData
      .flatMap(student => student.activities)
      .map(activity => activity?.observation || '')
      .filter(observation => observation);

    const filteredObservations = allObservations.map(observation => {
      const words = observation.split(/\s+/);
      return words.filter((word: string) => {
        return !this.stopWordsSpanish.includes(word.toLowerCase()) && !this.stopWordsEnglish.includes(word.toLowerCase());
      }).join(' ');
    }).filter(observation => observation);

    const wordCount: { [key: string]: number } = {};

    filteredObservations.forEach(observation => {
      const words = observation.split(/\s+/);
      words.forEach((word: string) => {
        word = word.toLowerCase();
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    });

    let wordCloudArray = Object.entries(wordCount).map(([word, count]) => {
      if (!this.colorMap[word]) {
        this.colorMap[word] = this.getRandomColor();  // Genera el color solo si no existe
      }
      return {
        name: word,
        value: count,
        color: this.colorMap[word]
      };
    });

    wordCloudArray = wordCloudArray
      .sort((a, b) => b.value - a.value)
      .slice(0, 20);

    this.wordCloudData = wordCloudArray;

    // Marcar el componente como actualizado para evitar cambios innecesarios
    this.cdr.markForCheck();
  }
  trackByName(index: number, word: WordData): string {
    return word.name;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getFontSize(frequency: number): string {
    const maxFrequency = Math.max(...this.wordCloudData.map((word: WordData) => word.value));
    const minFontSize = 7;
    const maxFontSize = 40;
    const fontSize = minFontSize + ((frequency / maxFrequency) * (maxFontSize - minFontSize));
    return `${fontSize}px`;
  }

}

interface WordData {
  name: string;
  value: number;
  color: string;
}
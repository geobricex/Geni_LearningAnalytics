import{d as h}from"./chunk-PR5YLG4S.js";import{Ga as c,Ha as p,Ia as u,ka as m,la as d}from"./chunk-5QE4J26S.js";import"./chunk-QDXQE2EN.js";import"./chunk-4DBIC76I.js";import{Ha as a,Pb as e,Qb as o,Wa as s,tb as i,ub as t}from"./chunk-52YOYMDA.js";var g=class l{SchemaLevel3_1=`{
    "student_id": "A202501",
    "student_name": "Jeniffer L\xF3pez Aguiar",
    "age": 21,
    "gender": "femenino",
    "has_internet_access": true,
    "device_type": "laptop",
    "previous_school_type": "p\xFAblica",
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
    "course_name": "Fundamentos de Programaci\xF3n",
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
  }`;SchemaLevel3_2=`{
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
  }`;SchemaLevel3_3=`{
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
  }`;static \u0275fac=function(n){return new(n||l)};static \u0275cmp=s({type:l,selectors:[["app-info-level3"]],decls:348,vars:3,consts:[[1,"p-mt-4"],["header","Schema Level 3"],["header","Schema Description",1,"p-mb-3","shadow-3"],[1,"p-card-body"],[1,"text-lg"],["header","General Structure",1,"p-mb-3","shadow-3"],["header","Student Attributes",1,"p-mb-3","shadow-3"],[1,"list-disc","pl-6","text-lg"],["header","Digital and Academic Interaction Attributes",1,"p-mb-3","shadow-3"],["header","Activity Attributes",1,"p-mb-3","shadow-3"],["header","Example Entry",1,"p-mb-3","shadow-3"],["header","Socioeconomic and Academic Analysis"],["header","Script Description",1,"p-mb-3","shadow-3"],["header","What the Code Does",1,"p-mb-3","shadow-3"],[1,"pl-8"],["header","Individual Analysis",1,"p-mb-3","shadow-3"],["header","Socioacademic Correlations",1,"p-mb-3","shadow-3"],["header","Grouping by Categories",1,"p-mb-3","shadow-3"],["header","Generated Output",1,"p-mb-3","shadow-3"],["header","Socioeconomic and Academic Results"],["header","Generated Socioeconomic and Academic Report",1,"p-mb-3","shadow-3"],["header","Individual Profile per Student",1,"p-mb-3","shadow-3"],["header","Global and Grouped Statistics",1,"p-mb-3","shadow-3"],["header","Key Correlations",1,"p-mb-3","shadow-3"],["header","Report Usefulness",1,"p-mb-3","shadow-3"],["header","Example of Socioeconomic Results JSON",1,"p-mb-3","shadow-3"]],template:function(n,r){n&1&&(i(0,"p-tabView",0)(1,"p-tabPanel",1)(2,"p-card",2)(3,"div",3)(4,"p",4),e(5,"Level 3 represents the most comprehensive version of the academic and contextual data structure of the student. It encompasses performance indicators, interaction metrics, sociodemographic variables, and socioeconomic conditions, allowing integral, intersectional, and predictive analysis in educational contexts."),t()()(),i(6,"p-card",5)(7,"div",3)(8,"p",4),e(9,"Level 3 contains a list of objects where each object represents a student with personal, academic, digital, and family information relevant for educational analysis."),t()()(),i(10,"p-card",6)(11,"ul",7)(12,"li")(13,"strong"),e(14,"student_id"),t(),e(15," (str): Unique identifier of the student."),t(),i(16,"li")(17,"strong"),e(18,"student_name"),t(),e(19," (str): Full name."),t(),i(20,"li")(21,"strong"),e(22,"age"),t(),e(23," (int): Current age of the student."),t(),i(24,"li")(25,"strong"),e(26,"gender"),t(),e(27," (str): Self-perceived gender."),t(),i(28,"li")(29,"strong"),e(30,"has_internet_access"),t(),e(31," (bool): Indicates if the student has internet access."),t(),i(32,"li")(33,"strong"),e(34,"device_type"),t(),e(35," (str): Type of device used for studying."),t(),i(36,"li")(37,"strong"),e(38,"previous_school_type"),t(),e(39," (str): Previous school type (public/private)."),t(),i(40,"li")(41,"strong"),e(42,"parents_education_level"),t(),e(43," (str): Educational level of parents."),t(),i(44,"li")(45,"strong"),e(46,"receives_scholarship"),t(),e(47," (bool): Indicates if the student receives a scholarship."),t(),i(48,"li")(49,"strong"),e(50,"socioeconomic_level"),t(),e(51," (str): Perceived socioeconomic level (high, medium, low)."),t(),i(52,"li")(53,"strong"),e(54,"family_income_monthly"),t(),e(55," (float): Monthly family income in dollars."),t(),i(56,"li")(57,"strong"),e(58,"dependents_count"),t(),e(59," (int): Number of dependent persons in the household."),t(),i(60,"li")(61,"strong"),e(62,"employment_status"),t(),e(63," (str): Employment status of the student."),t(),i(64,"li")(65,"strong"),e(66,"housing_type"),t(),e(67," (str): Type of housing (owned, rented, irregular)."),t(),i(68,"li")(69,"strong"),e(70,"zone_type"),t(),e(71," (str): Geographical zone (urban/rural)."),t(),i(72,"li")(73,"strong"),e(74,"birth_date"),t(),e(75," (str): Birth date (YYYY-MM-DD)."),t(),i(76,"li")(77,"strong"),e(78,"civil_status"),t(),e(79," (str): Marital status."),t(),i(80,"li")(81,"strong"),e(82,"ethnicity"),t(),e(83," (str): Self-identified ethnicity."),t(),i(84,"li")(85,"strong"),e(86,"has_children"),t(),e(87," (bool): Indicates if the student has children."),t(),i(88,"li")(89,"strong"),e(90,"number_of_children"),t(),e(91," (int): Number of children."),t(),i(92,"li")(93,"strong"),e(94,"housing_ownership_status"),t(),e(95," (str): Housing tenure status (owned, rented, etc.)."),t(),i(96,"li")(97,"strong"),e(98,"housing_condition"),t(),e(99," (str): Housing condition."),t(),i(100,"li")(101,"strong"),e(102,"people_living_in_home"),t(),e(103," (int): Number of people living in the household."),t(),i(104,"li")(105,"strong"),e(106,"rooms_in_home"),t(),e(107," (int): Total number of rooms in the house."),t(),i(108,"li")(109,"strong"),e(110,"commute_time_minutes"),t(),e(111," (int): Daily commute time to the institution (in minutes). "),t()()(),i(112,"p-card",8)(113,"ul",7)(114,"li")(115,"strong"),e(116,"course_id"),t(),e(117," (str): Enrolled course code."),t(),i(118,"li")(119,"strong"),e(120,"course_name"),t(),e(121," (str): Course name."),t(),i(122,"li")(123,"strong"),e(124,"accesses_last_7_days"),t(),e(125," (int): Platform accesses in the last week."),t(),i(126,"li")(127,"strong"),e(128,"total_connection_time_minutes"),t(),e(129," (int): Total connection time in minutes."),t(),i(130,"li")(131,"strong"),e(132,"resources_visited"),t(),e(133," (int): Number of visited resources."),t(),i(134,"li")(135,"strong"),e(136,"forum_posts"),t(),e(137," (int): Number of forum participations."),t(),i(138,"li")(139,"strong"),e(140,"activities"),t(),e(141," (list): List of evaluated activities."),t()()(),i(142,"p-card",9)(143,"ul",7)(144,"li")(145,"strong"),e(146,"activity_id"),t(),e(147," (str): Unique identifier of the activity."),t(),i(148,"li")(149,"strong"),e(150,"type"),t(),e(151," (str): Type of activity (quiz, forum, task)."),t(),i(152,"li")(153,"strong"),e(154,"title"),t(),e(155," (str): Descriptive title of the activity."),t(),i(156,"li")(157,"strong"),e(158,"grade"),t(),e(159," (float): Grade obtained."),t(),i(160,"li")(161,"strong"),e(162,"max_grade"),t(),e(163," (float): Maximum possible grade."),t(),i(164,"li")(165,"strong"),e(166,"submission_date"),t(),e(167," (str, ISO 8601): Submission date and time."),t(),i(168,"li")(169,"strong"),e(170,"observation"),t(),e(171," (str): Teacher's comment on performance."),t()()(),i(172,"p-card",10)(173,"pre")(174,"code"),e(175),t()()()(),i(176,"p-tabPanel",11)(177,"p-card",12)(178,"div",3)(179,"p",4),e(180,"This script processes a JSON object named schema, which contains academic, digital interaction, and sociodemographic data of students. The objective is to perform an integral analysis that explores relationships between life context and academic performance, incorporating inequality measures, housing conditions, and personal factors."),t()()(),i(181,"p-card",13)(182,"ul",7)(183,"li"),e(184,"Reads a JSON object with complete student records."),t(),i(185,"li"),e(186,"Extracts academic, economic, demographic, housing, and technological information."),t(),i(187,"li"),e(188,"Calculates derived indicators such as:"),t(),i(189,"ul",14)(190,"li")(191,"strong"),e(192,"Per capita income"),t(),e(193,"."),t(),i(194,"li")(195,"strong"),e(196,"Income per dependent"),t(),e(197,"."),t(),i(198,"li")(199,"strong"),e(200,"Housing density"),t(),e(201," (number of people per room)."),t(),i(202,"li")(203,"strong"),e(204,"Estimated age"),t(),e(205," from birth date."),t()()()(),i(206,"p-card",15)(207,"ul",7)(208,"li"),e(209,"Personal and family information."),t(),i(210,"li"),e(211,"Housing conditions and socioeconomic level."),t(),i(212,"li"),e(213,"Average grades and extreme grades."),t(),i(214,"li"),e(215,"Use of digital resources."),t(),i(216,"li"),e(217,"Composite indicators of inequality or vulnerability."),t()()(),i(218,"p-card",16)(219,"ul",7)(220,"li"),e(221,"Correlation between family income and academic average."),t(),i(222,"li"),e(223,"Correlation between number of dependents, people in the household, density, or commute time and grades."),t(),i(224,"li"),e(225,"Connection time as a predictor of performance."),t()(),i(226,"p",4),e(227,"This analysis explores potential associations useful for generating educational and social hypotheses."),t()(),i(228,"p-card",17)(229,"ul",7)(230,"li"),e(231,"Academic averages grouped by:"),t(),i(232,"ul",14)(233,"li"),e(234,"Socioeconomic level."),t(),i(235,"li"),e(236,"Employment type."),t(),i(237,"li"),e(238,"Ethnicity."),t(),i(239,"li"),e(240,"Civil status."),t(),i(241,"li"),e(242,"Presence of children."),t(),i(243,"li"),e(244,"Device type."),t(),i(245,"li"),e(246,"Geographical zone (urban/rural)."),t(),i(247,"li"),e(248,"Housing condition."),t(),i(249,"li"),e(250,"Housing ownership."),t(),i(251,"li"),e(252,"Internet access."),t()()()(),i(253,"p-card",18)(254,"p"),e(255,"The script generates a JSON response that contains a structured summary of the socioeconomic and academic analysis. This file is organized into two main blocks:"),t(),i(256,"pre")(257,"code"),e(258),t()()()(),i(259,"p-tabPanel",19)(260,"p-card",20)(261,"div",3)(262,"p",4),e(263,"This document presents the results obtained after processing the JSON object, which integrates information about academic performance, digital interaction, and students' sociodemographic conditions. The generated analysis seeks to identify potential relationships between life context and academic performance."),t()()(),i(264,"p-card",21)(265,"ul",7)(266,"li"),e(267,"Demographic data (calculated age, gender, ethnicity, civil status, presence of children)."),t(),i(268,"li"),e(269,"Socioeconomic conditions (socioeconomic level, income, housing tenure, and condition)."),t(),i(270,"li"),e(271,"Access and use of technology (device, internet connection, platform interaction)."),t(),i(272,"li"),e(273,"Academic indicators (average, minimum, and maximum grade)."),t(),i(274,"li"),e(275,"Derived indicators such as per capita income, income per dependent, and housing density."),t()(),i(276,"p",4),e(277,"This level of detail allows constructing intersectional profiles useful for guidance plans, academic support, or vulnerability analysis."),t()(),i(278,"p-card",22)(279,"ul",7)(280,"li"),e(281,"The "),i(282,"code"),e(283,"analyticalSummary"),t(),e(284," block groups and averages academic performance according to key categories:"),t(),i(285,"ul",14)(286,"li")(287,"strong"),e(288,"Socioeconomic Level"),t(),e(289,": High-income students average higher than low-income ones."),t(),i(290,"li")(291,"strong"),e(292,"Employment Type"),t(),e(293,": Better performance among those who do not work or work part-time."),t(),i(294,"li")(295,"strong"),e(296,"Geographic Zone"),t(),e(297,": Higher performance in urban areas compared to rural ones."),t(),i(298,"li")(299,"strong"),e(300,"Device Used"),t(),e(301,": Laptop users achieve the highest averages."),t(),i(302,"li")(303,"strong"),e(304,"Internet Access"),t(),e(305,": Connected students perform significantly better than disconnected ones."),t()()(),i(306,"p",4),e(307,"General statistics such as average age, income, per capita income, and housing density were also identified."),t()(),i(308,"p-card",23)(309,"ul",7)(310,"li")(311,"strong"),e(312,"Income vs. Average"),t(),e(313,": 0.77 - Strong positive correlation between income and average grade."),t(),i(314,"li")(315,"strong"),e(316,"Dependents vs. Average"),t(),e(317,": -0.82 - More dependents, lower performance."),t(),i(318,"li")(319,"strong"),e(320,"Density vs. Average"),t(),e(321,": 0.62 - Higher housing density, better performance in this specific case."),t(),i(322,"li")(323,"strong"),e(324,"Commute Time vs. Average"),t(),e(325,": -1.0 - Longer commute time associated with lower performance."),t(),i(326,"li")(327,"strong"),e(328,"Connection Time vs. Average"),t(),e(329,": 0.99 - Strong association between digital connection and performance."),t()(),i(330,"p",4),e(331,"These relationships support the design of targeted strategies and provide insights into the impact of context on learning."),t()(),i(332,"p-card",24)(333,"ul",7)(334,"li"),e(335,"Analyze educational inequalities from a comprehensive perspective."),t(),i(336,"li"),e(337,"Design focused academic support strategies."),t(),i(338,"li"),e(339,"Feed early warning systems considering contextual variables."),t(),i(340,"li"),e(341,"Identify structural factors that influence performance."),t(),i(342,"li"),e(343,"Support educational or social research with solid empirical evidence."),t()()(),i(344,"p-card",25)(345,"pre")(346,"code"),e(347),t()()()()()),n&2&&(a(175),o(r.SchemaLevel3_1),a(83),o(r.SchemaLevel3_2),a(89),o(r.SchemaLevel3_3))},dependencies:[h,d,m,u,p,c],encapsulation:2})};export{g as InfoLevel3Component};

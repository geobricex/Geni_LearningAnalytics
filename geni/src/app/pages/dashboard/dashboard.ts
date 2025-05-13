import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion'; 

@Component({
    selector: 'app-dashboard',
    imports: [NgIf, CommonModule, CardModule, ButtonModule, PanelModule, TabViewModule, CarouselModule, AccordionModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    standalone: true,

})

export class Dashboard {
    showingLevels: boolean = false;

    features = [
        { title: 'Data consolidation from diverse educational platforms.', icon: 'pi pi-database' },
        { title: 'Advanced analytics using machine learning techniques.', icon: 'pi pi-chart-line' },
        { title: 'Interpretation of results using large language models (LLM).', icon: 'pi pi-comments' },
        { title: 'Integration with existing educational systems.', icon: 'pi pi-cog' }
    ];

    levels = [
  { title: 'Level 1: Academic', icon: 'pi pi-book', description: 'Academic data insights to enhance curriculum and student outcomes.' },
  { title: 'Level 2: Interaction', icon: 'pi pi-users', description: 'Analyzing student interactions to boost engagement.' },
  { title: 'Level 3: Socioeconomic', icon: 'pi pi-chart-bar', description: 'Data on socioeconomic factors to understand student performance.' }
];


    showLevels(): void {
        this.showingLevels = !this.showingLevels;
    }
}

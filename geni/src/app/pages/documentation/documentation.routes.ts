// documentation.routes.ts
import { Routes } from '@angular/router';
import { InfoLevel1Component } from './level1/info-level1.component';  
import { InfoLevel2Component } from './level2/info-level2.component';  
import { InfoLevel3Component } from './level3/info-level3.component';  

export default [
    {
        path: 'level1',
        loadComponent: () => import('./level1/info-level1.component').then(m => m.InfoLevel1Component)
    },
     {
        path: 'level2',
        loadComponent: () => import('./level2/info-level2.component').then(m => m.InfoLevel2Component)
    },
     {
        path: 'level3',
        loadComponent: () => import('./level3/info-level3.component').then(m => m.InfoLevel3Component)
    },
    { path: '**', redirectTo: 'level1' }
] as Routes;

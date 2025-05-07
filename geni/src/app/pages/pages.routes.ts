import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Level1 } from './level1/level1';
import { Level2 } from './level2/level2';
import { Level3 } from './level3/level3';
import { Level4 } from './level4/level4';


export default [
    { path: 'documentation', component: Documentation },
    { path: 'level1', component: Level1 },
    { path: 'level2', component: Level2 },
    { path: 'level3', component: Level3 },
    { path: 'level4', component: Level4 },

    { path: '**', redirectTo: '/notfound' }
] as Routes;

import { Routes } from '@angular/router';
import { Level1 } from './level1/level1';
import { Level2 } from './level2/level2';
import { Level3 } from './level3/level3';


export default [
    { path: 'level1', component: Level1 },
    { path: 'level2', component: Level2 },
    { path: 'level3', component: Level3 },

    { path: '**', redirectTo: '/notfound' }
] as Routes;

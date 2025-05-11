// pages.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import pagesRoutes from './pages.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes), HttpClientModule],
    exports: [RouterModule, HttpClientModule]
})
export class pagesModule {}

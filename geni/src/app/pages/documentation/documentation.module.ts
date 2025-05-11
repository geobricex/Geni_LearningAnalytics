// documentation.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import documentationRoutes from './documentation.routes';

@NgModule({
    imports: [RouterModule.forChild(documentationRoutes)],
    exports: [RouterModule]
})
export class DocumentationModule {}

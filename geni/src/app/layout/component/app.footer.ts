import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        GENI by
        <a href="https://cleancodesas.github.io/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">
        CleanCode</a>
    </div>`
})
export class AppFooter {}

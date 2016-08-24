import { Component } from '@angular/core';
import { ItemsStateService } from '../customization/items-state.service';

@Component({
    template: `
        <router-outlet></router-outlet>
    `,
    providers: [ItemsStateService]
})
export class MoviesComponent {}

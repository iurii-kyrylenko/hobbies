import { Component } from '@angular/core';
import { ItemsStateService } from '../customization/items-state.service';


@Component({
    templateUrl: './movie-list.component.html'
})
export class MovieListComponent {
    constructor(private state: ItemsStateService) {}
}

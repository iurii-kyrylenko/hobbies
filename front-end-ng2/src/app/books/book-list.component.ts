import { Component } from '@angular/core';
import { ItemsStateService } from '../customization/items-state.service';

@Component({
    templateUrl: './book-list.component.html'
})
export class BookListComponent {
    constructor(private state: ItemsStateService) {}
}

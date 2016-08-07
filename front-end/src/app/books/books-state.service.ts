import { URLSearchParams } from '@angular/http'

export class BookStateService {

    searchFilter = '';

    get searchParams() {
        if(!this.searchFilter.trim()) {
            return null;
        }
        const search = new URLSearchParams();
        search.append('term', this.searchFilter);
        return { search };

    }
}

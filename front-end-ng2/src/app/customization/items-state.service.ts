import { URLSearchParams } from '@angular/http'

export class ItemsStateService {

    term = ''
    page: number;

    get queryParams() {

        const search = new URLSearchParams();

        if(this.term.trim()) {
            search.append('term', this.term);
        }

        if(this.page > 0) {
            search.append('page', this.page.toString());
        }

        return { search };
    }

    get searchParams() {

        const search = new URLSearchParams();

        if(this.term.trim()) {
            search.append('term', this.term);
        }

        return { search };
    }
}

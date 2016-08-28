import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent {
    @Input() page: number;
    @Input() pagesCount: number;
    @Output() change = new EventEmitter<number>()

    private getPagerLimits(pageCount: number, page: number) {

        const frame = 8;

        if(pageCount <= frame) {
            return { min: 1, max: pageCount };
        }

        const f1 = Math.floor(frame / 2);
        const f2 = pageCount - f1 + 1;

        let min = 1;
        if(f1 < page && page < f2) min = page - f1;
        if(page >= f2) min = f2 - f1;

        let max = min + frame - 1;

        return {min, max};
    }

    get pages() {
        const { min, max } = this.getPagerLimits(this.pagesCount, this.page);
        const pa: number[] = [];
        for(let i = min; i <= max; i++) {
            pa.push(i);
        }
        return pa;
    }

    select(event: any, page: number) {
        event.preventDefault();
        this.change.emit(page);
    }

    previous(event: any) {
        event.preventDefault();
        this.change.emit(this.page - 1);
    }

    next(event: any) {
        event.preventDefault();
        this.change.emit(this.page + 1);
    }
}

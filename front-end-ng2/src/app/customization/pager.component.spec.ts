import { TestBed } from '@angular/core/testing';
import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {

    let pager: PagerComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [PagerComponent]});
        const fixture = TestBed.createComponent(PagerComponent);
        pager = fixture.componentInstance;

        pager.frame = 10;
        pager.pagesCount = 100;
    });

    it ('should work when page is in the first half-frame', () => {
        pager.page = 1;
        expect(pager.pages).toEqual([1,2,3,4,5,6,7,8,9,10]);
        pager.page = 6;
        expect(pager.pages).toEqual([1,2,3,4,5,6,7,8,9,10]);
    });

    it ('should work when page is out of the first and the last half-frames', () => {
        pager.page = 7;
        expect(pager.pages).toEqual([2,3,4,5,6,7,8,9,10,11]);
        pager.page = 95;
        expect(pager.pages).toEqual([90,91,92,93,94,95,96,97,98,99]);
    });

    it ('should work when page is in the last half-frame', () => {
        pager.page = 96;
        expect(pager.pages).toEqual([91,92,93,94,95,96,97,98,99,100]);
        pager.page = 100;
        expect(pager.pages).toEqual([91,92,93,94,95,96,97,98,99,100]);
    });

});

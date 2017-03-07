import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { ModalComponent } from './modal.component';
import { NotificationService } from '../notifications/notification.service';
import { ItemsStateService } from './items-state.service';

const saveAs = require('file-saver/FileSaver.js').saveAs;

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

    items: Item[];
    pages: number;

    @Input() state: ItemsStateService;
    @Input() searchPlaceholder: string;
    @Input() addPrompt: string;
    @Input() uploadPrompt: string;
    @Input() downloadPrompt: string;
    @Input() removeHeader: string;
    @Input() apiSelector: string;
    @Input() exportFileName: string;

    @ViewChild('deleteConfirm') deleteConfirm: ModalComponent;
    @ViewChild('uploadForm') uploadForm: any;

    constructor(
        private http: Http,
        private config: AppConfig,
        private auth: AuthService,
        private ntfs: NotificationService
    ) {}

    ngOnInit() {
        this.pageReset();
    }

    getItems() {
        const url = `${this.config.apiUrl}/${this.apiSelector}`;
        const requestOptions = Object.assign(
            {}, this.auth.authHeader, this.state.queryParams
        );
        this.http.get(url, requestOptions)
        .map(res => {
            const data = res.json();
            data.items.forEach((item: any) => item.completed = new Date(item.completed));
            return data;
        }).subscribe(data => {
            this.items = data.items;
            this.pages = data.pages;
        });
    }

    applySearch(term: string) {
        this.state.term = term;
        this.state.page = 1;
        this.getItems();
    }

    pageChange(page: number) {
        this.state.page = page;
        this.getItems();
    }

    pageReset() {
        this.state.page = 1;
        this.getItems();
    }

    removeConfirm(item: Item) {
        this.deleteConfirm.open(item.title).subscribe(isConfirmed => {
            if(isConfirmed) this.removeBook(item);
         });
    }

    private removeBook(item: Item) {
        const apiUrl = `${this.config.apiUrl}/${this.apiSelector}/${item._id}`;
        this.http
            .delete(apiUrl, this.auth.authHeader)
            .subscribe(res => {
                this.pageReset();
                this.ntfs.notifySuccess('An item has been removed :-)');
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when removing an item :-(');
            });
    }

    /*
     * Date pipe doesn't work in Safari.
     * TO DO: Move to a service.
     */
    formatDate(date: Date) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if(!date) return null;
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return `${months[month]} ${day}, ${year}`;
    }

    download() {
        const url = `${this.config.apiUrl}/${this.apiSelector}`;
        const requestOptions = Object.assign(
            {}, this.auth.authHeader, this.state.searchParams
        );
        this.http.get(url, requestOptions).map(res => res.json()).subscribe(data => {
            const blob = new Blob(
                [JSON.stringify(data.items, this.replaceForDownload, 1)],
                {type: 'application/json'});
            saveAs(blob, this.exportFileName);
        });
     }

    private replaceForDownload(key: string, value: any) {
        if(key === '_id') return undefined;
        if(value === '') return undefined;
        if(key === 'completed') return value.split(/T/)[0];
        return value;
    }

    uploadChange(event: any) {

        const files = event.target.files;
        if(!files.length) return;

        const apiUrl = `${this.config.apiUrl}/${this.apiSelector}/upload`;
        this.uploadRequest(apiUrl, files[0], this.auth.authHeader.headers)
            .then(() => {
                this.pageReset();
                this.ntfs.notifySuccess('Items have been uploaded :-)');
            }, () => {
                this.ntfs.notifyDanger('Something went wrong when uploading items :-(');
            });

        this.uploadForm.nativeElement.reset();
    }

    private uploadRequest(url: string, file: File, headers: Headers) {

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("upload", file, file.name);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST", url, true);
            headers.forEach((values, name, headers) => {
                xhr.setRequestHeader(name, values[0]);
            });
            xhr.send(formData);
        });
    }
}

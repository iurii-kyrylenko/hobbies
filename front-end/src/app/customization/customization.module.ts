import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';
import { ModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        DateInputComponent,
        ModalComponent
    ],
    exports: [
        DateInputComponent,
        ModalComponent
    ]
})
export class CustomizationModule {}

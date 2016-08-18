import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidatorsModule } from '../validators/validators.module';
import { userRoutes } from './user.routes';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ReCaptchaComponent } from './recaptcha.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ValidatorsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ReCaptchaComponent
    ]
})
export class UserModule {}

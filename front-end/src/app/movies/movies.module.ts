import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomizationModule } from '../customization/customization.module'
import { moviesRoutes } from './movies.routes';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list.component';

@NgModule({
    imports: [
        CommonModule,
        CustomizationModule,
        RouterModule.forChild(moviesRoutes)
    ],
    declarations: [
        MoviesComponent,
        MovieListComponent
    ]
})
export class MoviesModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomizationModule } from '../customization/customization.module'
import { moviesRoutes } from './movies.routes';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list.component';
import { EditMovieComponent } from './edit-movie.component';
import { NewMovieComponent } from './new-movie.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomizationModule,
        RouterModule.forChild(moviesRoutes)
    ],
    declarations: [
        MoviesComponent,
        MovieListComponent,
        EditMovieComponent,
        NewMovieComponent
    ]
})
export class MoviesModule {}

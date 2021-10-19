import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {EditMovieComponent} from "./components/edit-movie/edit-movie.component";
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {AddMovieComponent} from "./components/add-movie/add-movie.component";
import {AuthGuard} from "./services/guard.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit-movie/:id', component: EditMovieComponent, canActivate: [AuthGuard]},
  {path: 'add-movie', component: AddMovieComponent, canActivate: [AuthGuard]},
  {path: 'movie-list', component: MovieListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

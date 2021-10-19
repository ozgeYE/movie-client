import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditMovieComponent} from './components/edit-movie/edit-movie.component';
import {HeaderComponent} from './components/header/header.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MovieItemComponent} from './components/movie-item/movie-item.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditMovieComponent,
    HeaderComponent,
    MovieListComponent,
    MovieItemComponent,
    AddMovieComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

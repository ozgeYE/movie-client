import {Component} from '@angular/core';
import {IMovie} from "../../interfaces/Movie";
import {MovieService} from "../../services/movie.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  selectedMovie: IMovie | null = null;
  searchText: string = '';
  movieList: IMovie[] = [];

  constructor(private movieService: MovieService,
              private snackBar: MatSnackBar) {
  }

  searchMovie() {
    this.movieService.getMoviesFromOmdb(this.searchText).subscribe(res => {
      this.movieList = res.Search;
    })
  }

  selectMovie(movie: IMovie) {
    this.selectedMovie = movie;
    this.selectedMovie.time = new Date().getTime();
    this.selectedMovie.id = Math.floor(Math.random() * 1000000000);
  }

  saveMovie() {
    if (this.selectedMovie) {
      this.selectedMovie.imdbRating = +this.selectedMovie.imdbRating;
      this.movieService.addMovie(this.selectedMovie).subscribe(() => {
        this.snackBar.open(this.selectedMovie?.Title + ' Added!!!', 'X', {
          duration: 3000,
          verticalPosition: 'top'
        });

        this.selectedMovie = null;
        this.searchText = '';
        this.movieList = [];
      })
    }
  }

  public checkScore(event: any): boolean {
    if (this.selectedMovie) {
      const number = +(this.selectedMovie.imdbRating + event.key);
      if (number > 10) {
        return false
      }
    }

    let patt = /^([0-9])$/;
    return patt.test(event.key);
  }
}

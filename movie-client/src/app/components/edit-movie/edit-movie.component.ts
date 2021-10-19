import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {IMovie} from "../../interfaces/Movie";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  movieId: number = 0;
  selectedMovie: IMovie | undefined = undefined;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieById(this.movieId).subscribe(res => {
      this.selectedMovie = res;
    });
  }

  updateMovie(movie: IMovie) {
    movie.imdbRating = +movie.imdbRating;
    this.movieService.editMovie(movie).subscribe(() => {
      this.snackBar.open(`${movie.Title} updated!!`, 'X', {
        verticalPosition: 'top',
        duration: 3000
      })
    })
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

import {Component, HostListener, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IMovie} from "../../interfaces/Movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  count: number = 10;
  sortBy: string = '';
  searchKeyword: string = '';
  loading = false;

  constructor(private movieService: MovieService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if(!this.loading){
        this.loading= true;
        this.loadMore()
      }
    }
  }

  deleteMovie(movie: IMovie) {
    this.movieService.deleteMovie(movie.id).subscribe(() => {
      this.snackBar.open(movie.Title + ' Deleted!!!', 'X', {
        duration: 3000,
        verticalPosition: 'top',
      });

      let params = this.generateSearchUrl();
      this.movieService.getMovies(params).subscribe(res => {
        this.movies = res;
      })
    });
  }

  sortMovies() {
    this.count = 10;
    this.getMovies();
  }

  searchMovie() {
    this.count = 10;
    this.getMovies();
  }

  loadMore() {
    this.count += 10;
    this.getMovies();

  }

  private generateSearchUrl() {
    let params = `?_start=0&_end=${this.count}&_sort=time&_order=desc`;

    if (this.sortBy) {
      params = `?_start=0&_end=${this.count}&_sort=imdbRating,time&_order=${this.sortBy},desc`
    }

    if (this.searchKeyword) {
      params = `?_start=0&_end=${this.count}&_sort=time&_order=desc&Title_like=${this.searchKeyword}`
    }

    if (this.sortBy && this.searchKeyword) {
      params = `?_start=0&_end=${this.count}&_sort=imdbRating,time&_order=${this.sortBy},desc&Title_like=${this.searchKeyword}`
    }

    return params;
  }

  getMovies() {
    const params = this.generateSearchUrl();
    this.movieService.getMovies(params).subscribe(res => {
      this.movies = res;
      this.loading= false;
    })
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMovie} from "../../interfaces/Movie";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MovieService} from "../../services/movie.service";
import {trigger} from "@angular/animations";
import {fadeIn} from "../../extras/animation";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: any;
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  poster = '';
  dataLoaded = false;

  constructor(private router: Router,
              public dialog: MatDialog,
              public movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getPosterFromOmdb(this.movie.imdbID).subscribe(res => {
      this.poster = res.Poster;
      this.dataLoaded = true;
    });
  }

  async goEditMovie(movie: IMovie) {
    await this.router.navigate(['edit-movie', movie.id]);
  }

  deleteMovie(movie: IMovie) {
    this.openDialog(movie);
  }

  openDialog(movie: IMovie): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {message: 'Do you want to delete ' + movie.Title}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'yes') {
        this.deleteItem.emit(movie);
      }
    });
  }
}

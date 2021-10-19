import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMovie} from "../interfaces/Movie";
import config from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {
  }

  getMoviesFromOmdb(title?: any): Observable<any> {
    const apiKey = config.imdbApiKey;
    return this.http.get<any>(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
  }

  getPosterFromOmdb(imdbId: string): Observable<IMovie> {
    /*
    poster api'ını kullanamadım.ücretli üyelik istiyorlar. fake bir sorgu atıyorum.
    */
    const apiKey = config.imdbApiKey;
    return this.http.get<IMovie>(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`);
  }

  getMovies(params: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('http://localhost:3000/movie' + params).pipe();
  }

  getMovieById(movieId: number): Observable<IMovie> {
    return this.http.get<IMovie>(`http://localhost:3000/movie/${movieId}`).pipe();
  }

  editMovie(movie: IMovie): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/movie/${movie.id}`, movie).pipe();
  }

  addMovie(movie: IMovie): Observable<void> {
    return this.http.post<void>(`http://localhost:3000/movie`, movie).pipe();
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/movie/' + movieId).pipe();
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async goAddMovie() {
    await this.router.navigate(['add-movie']);
  }

  async goMovieList() {
    await this.router.navigate(['movie-list']);
  }

  async logout() {
    localStorage.clear();
    await this.router.navigate(['login'])
  }

  isAuthExist() {
    return !!localStorage.getItem('username');
  }

}

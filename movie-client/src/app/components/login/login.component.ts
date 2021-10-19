import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  public loginInvalid = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    localStorage.clear();
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      if (username === 'admin' && password === '123456') {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        await this.router.navigate(['movie-list']);
      } else {
        this.snackBar.open('Username or password is wrong!!!', 'X', {
          verticalPosition: 'top',
          duration: 3000
        });
      }
    } else {
      this.snackBar.open('Please enter username and password!!!', 'X', {
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }
}

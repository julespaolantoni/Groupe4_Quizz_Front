import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.message = 'Veuillez remplir tous les champs';
      return;
    }

    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.message = 'Connecté en tant qu\'admin';
      this.router.navigate(['/admin']);
    } else {
      this.message = 'Identifiants incorrects';
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // ajuste le chemin

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email = '';
  password = '';
  userName = '';
  isLoginMode = true;
  message = '';

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.message = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.isLoginMode) {
      this.authService.setUser(this.email);
      this.message = `Connecté en tant que ${this.email}`;
    } else {
      if (!this.userName) {
        this.message = 'Veuillez saisir un nom d\'utilisateur';
        return;
      }
      this.authService.setUser(this.userName);
      this.message = `Inscrit et connecté en tant que ${this.userName}`;
    }

    this.email = '';
    this.password = '';
    this.userName = '';
  }
}

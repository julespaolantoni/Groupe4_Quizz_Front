import { Component } from '@angular/core';
import { QuizService } from 'services/quizz.service';


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

  constructor(private quizService: QuizService) {}

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
      // Simule login
      this.quizService.setUser(this.email);
      this.message = `Connecté en tant que ${this.email}`;
    } else {
      if (!this.userName) {
        this.message = 'Veuillez saisir un nom d\'utilisateur';
        return;
      }
      // Simule inscription
      this.quizService.setUser(this.userName);
      this.message = `Inscrit et connecté en tant que ${this.userName}`;
    }

    // Reset champs
    this.email = '';
    this.password = '';
    this.userName = '';
  }
}

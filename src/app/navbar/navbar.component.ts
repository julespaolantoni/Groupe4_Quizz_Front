import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { QuizService } from "services/quizz.service";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.scss"],
})
export class NavBarComponent implements OnInit {
  userName: string | null = null;

  // Injection des services dans le constructeur
  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.quizService.getUser();
  }

  logout() {
    this.authService.logout();  // Utilisation correcte avec camelCase
    this.router.navigate(['/login']);  // Navigation après déconnexion
  }
}

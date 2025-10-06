import { Component, OnInit } from "@angular/core";
import { QuizService } from "services/quizz.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.scss"],
})
export class NavBarComponent implements OnInit {
  userName: string | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.userName = this.quizService.getUser();
  }
}

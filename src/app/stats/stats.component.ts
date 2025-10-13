import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  sondageId = 1; // à adapter
  results: any[] = [];
  loading = true;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getResultsParSondage(this.sondageId).subscribe(data => {
      this.results = data;
      this.loading = false;
    });
  }
}

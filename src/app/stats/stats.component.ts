import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  sondages = [
    { id: 1, nom: 'Films' },
    { id: 2, nom: 'Parc' },
    { id: 3, nom: 'Personnage' },
    { id: 4, nom: 'Musique' },
    { id: 5, nom: 'Attraction' },
    { id: 6, nom: 'Mechant' },
  ];

  selectedSondageId: number | null = null;
  questions: QuestionDTO[] = [];
  loading = false;
  errorMessage = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  selectSondage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);
    this.selectedSondageId = id;

    if (!id) {
      this.questions = [];
      return;
    }

    this.loadQuestions(id);
  }

  loadQuestions(sondageId: number) {
    this.loading = true;
    this.errorMessage = '';
    this.questions = [];

    this.quizService.getQuestionsBySondage(sondageId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Erreur lors du chargement des questions.";
        this.loading = false;
      }
    });
  }
  getTotalVotes(): number {
  if (this.questions.length === 0) return 0;

  return this.questions[0].options.reduce((sum, option) => {
    return sum + (option.resultat?.nombreVotes || 0);
  }, 0);
}

getVotePercentage(optionVotes: number): string {
  const total = this.getTotalVotes();
  if (total === 0) return '0%';

  return ((optionVotes / total) * 100).toFixed(1) + '%'; // 1 chiffre après la virgule
}

}

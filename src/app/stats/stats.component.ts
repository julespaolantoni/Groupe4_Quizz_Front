import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, ReponseOptionDTO } from '../services/quiz.service';

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

  // Palette de couleurs pour le camembert
  private colors = [
    '#4caf50', // vert
    '#2196f3', // bleu
    '#ff9800', // orange
    '#e91e63', // rose
    '#9c27b0', // violet
    '#00bcd4', // turquoise
    '#ffc107', // ambre
    '#795548'  // marron
  ];

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

  // Keep original helpers for backward compatibility (first question)
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

  // Nouveaux helpers : calculs par question
  getTotalVotesForQuestion(question: QuestionDTO): number {
    if (!question || !question.options) return 0;
    return question.options.reduce((sum, opt) => sum + (opt.resultat?.nombreVotes || 0), 0);
  }

  getVotePercentageForQuestion(optionVotes: number, question: QuestionDTO): string {
    const total = this.getTotalVotesForQuestion(question);
    if (total === 0) return '0%';
    return ((optionVotes / total) * 100).toFixed(1) + '%';
  }

  // Construire une string CSS conic-gradient pour le camembert
  buildConicGradient(options: ReponseOptionDTO[] | undefined): string {
    if (!options || options.length === 0) {
      return 'conic-gradient(#e0e0e0 0% 100%)';
    }

    const total = options.reduce((sum, opt) => sum + (opt.resultat?.nombreVotes || 0), 0);
    if (total === 0) {
      // Aucun vote : affichage gris
      return 'conic-gradient(#e0e0e0 0% 100%)';
    }

    let cumulative = 0;
    const segments: string[] = [];

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const votes = opt.resultat?.nombreVotes || 0;
      const pct = (votes / total) * 100;
      const start = cumulative;
      const end = cumulative + pct;
      const color = this.colors[i % this.colors.length];
      segments.push(`${color} ${start.toFixed(2)}% ${end.toFixed(2)}%`);
      cumulative = end;
    }

    // S'assurer que la somme couvre 100% (petits arrondis)
    if (cumulative < 100) {
      segments.push(`#e0e0e0 ${cumulative.toFixed(2)}% 100%`);
    }

    return `conic-gradient(${segments.join(', ')})`;
  }

}

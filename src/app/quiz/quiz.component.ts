import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, ReponseOptionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  sondageId = 1; // à changer selon ton cas (ex: route param)
  questions: QuestionDTO[] = [];
  currentIndex = 0;
  quizFinished = false;
  userAnswers: number[] = []; // IDs des options choisies

  loading = true;
  errorMessage = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizService.getQuestions(this.sondageId).subscribe({
      next: questions => {
        this.questions = questions;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = "Erreur lors du chargement des questions.";
        this.loading = false;
      }
    });
  }

  selectOption(option: ReponseOptionDTO) {
    // Enregistre la réponse utilisateur
    this.userAnswers[this.currentIndex] = option.id;

    // Envoie le vote au backend
    this.quizService.voterOption(option.id).subscribe({
      next: () => {
        this.goToNext();
      },
      error: () => {
        alert("Erreur lors de l'envoi du vote.");
        this.goToNext();
      }
    });
  }

  goToNext() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinished = true;
    }
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.quizFinished = false;
    this.userAnswers = [];
    this.loadQuestions();
  }
  
}

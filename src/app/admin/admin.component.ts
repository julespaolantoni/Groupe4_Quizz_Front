import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, SondageDTO, ReponseOptionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  sondages: SondageDTO[] = [];
  sondageId: number | null = null;

  questions: QuestionDTO[] = [];
  newQuestionText: string = '';

  newOptions: { text: string; votes: number }[] = [
    { text: '', votes: 0 },
    { text: '', votes: 0 },
    { text: '', votes: 0 },
    { text: '', votes: 0 },
  ];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadSondages();
  }

  loadSondages(): void {
    this.quizService.getSondages().subscribe(sondages => {
      this.sondages = sondages;
      if (sondages.length > 0) {
        this.sondageId = sondages[0].id;
        this.loadQuestions();
      }
    });
  }

  onSondageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sondageId = Number(select.value);
    this.loadQuestions();
  }

  loadQuestions(): void {
    if (!this.sondageId) return;
    this.quizService.getQuestionsBySondage(this.sondageId).subscribe((questions) => {
      this.questions = questions;
    });
  }

  ajouterQuestion(): void {
    if (!this.sondageId) {
      alert('Veuillez sélectionner un sondage.');
      return;
    }

    if (!this.newQuestionText.trim()) {
      alert('Veuillez saisir une question.');
      return;
    }

    const validOptions = this.newOptions.filter(opt => opt.text.trim() !== '');
    if (validOptions.length !== 4) {
      alert('Veuillez saisir exactement 4 options de réponse.');
      return;
    }

    const options: ReponseOptionDTO[] = validOptions.map(opt => ({
      id: 0,
      texteOption: opt.text,
      questionId: 0, // sera défini côté backend
      resultat: {
        id: 0,
        reponseId: 0, // sera défini côté backend
        nombreVotes: opt.votes ?? 0
      }
    }));

    const questionDTO: QuestionDTO = {
      id: 0,
      texteQuestion: this.newQuestionText,
      sondageId: this.sondageId,
      options: options
    };

    this.quizService.addQuestion(questionDTO).subscribe({
      next: () => {
        this.loadQuestions();
        this.resetForm();
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de la question :", err);
        alert("Une erreur est survenue.");
      }
    });
  }

  resetForm(): void {
    this.newQuestionText = '';
    this.newOptions = [
      { text: '', votes: 0 },
      { text: '', votes: 0 },
      { text: '', votes: 0 },
      { text: '', votes: 0 },
    ];
  }
}

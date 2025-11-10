import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, SondageDTO, ReponseOptionDTO, OptionDTO } from '../services/quiz.service';
import { forkJoin } from 'rxjs';

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

  newOptions: { text: string }[] = [
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
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

    const newOptionPayloads: ReponseOptionDTO[] = validOptions.map(opt => ({
      id: 0,
      texteOption: opt.text,
      questionId: 0
    }));

    const questionDTO: QuestionDTO = {
      id: 0,
      texteQuestion: this.newQuestionText,
      sondageId: this.sondageId,
      options: []
    };

    this.quizService.addQuestion(questionDTO).subscribe({
      next: (createdQuestion) => {
        const qId = createdQuestion?.id || 0;
        if (!qId) {
          console.warn('L’id de la question créée est invalide, tentative de rechargement.');
          this.loadQuestions();
          this.resetForm();
          return;
        }

        const calls = newOptionPayloads.map(optPayload => {
          optPayload.questionId = qId;
          return this.quizService.addOption(qId, optPayload);
        });

        forkJoin(calls).subscribe({
          next: () => {
            this.loadQuestions();
            this.resetForm();
          },
          error: (err) => {
            console.error('Erreur lors de la création des options :', err);
            alert('La question a été créée mais une erreur est survenue lors de la création des options.');
            this.loadQuestions();
            this.resetForm();
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la question :', err);
        alert('Une erreur est survenue.');
      }
    });
  }

  resetForm(): void {
    this.newQuestionText = '';
    this.newOptions = [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
    ];
  }
}

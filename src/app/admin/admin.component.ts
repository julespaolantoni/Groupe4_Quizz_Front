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

    // On n'envoie pas le champ "resultat" : le backend créera le Resultat associé (relation cascade)
    const newOptionPayloads: ReponseOptionDTO[] = validOptions.map(opt => ({
      id: 0,
      texteOption: opt.text,
      questionId: 0 // sera défini après création de la question
    } as ReponseOptionDTO));

    // Créer la question sans options (les options seront créées séparément via l'endpoint addOption)
    const questionDTO: QuestionDTO = {
      id: 0,
      texteQuestion: this.newQuestionText,
      sondageId: this.sondageId,
      options: [] // backend remplira / on créera après
    };

    this.quizService.addQuestion(questionDTO).subscribe({
      next: (createdQuestion) => {
        // Si le backend retourne l'id de la question créée, on crée les options associées
        const qId = createdQuestion && createdQuestion.id ? createdQuestion.id : 0;
        if (!qId) {
          // fallback : recharger les questions et avertir l'utilisateur
          console.warn('L’id de la question créée est invalide, tentative de rechargement des questions.');
          this.loadQuestions();
          this.resetForm();
          return;
        }

        // Mettre à jour questionId dans les payloads
        const calls = newOptionPayloads.map(optPayload => {
          optPayload.questionId = qId;
          return this.quizService.addOption(qId, optPayload);
        });

        forkJoin(calls).subscribe({
          next: (results: OptionDTO[]) => {
            // Toutes les options créées, recharger les questions
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
      { text: '', votes: 0 },
      { text: '', votes: 0 },
      { text: '', votes: 0 },
      { text: '', votes: 0 },
    ];
  }
}

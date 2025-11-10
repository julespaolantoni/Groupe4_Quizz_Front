import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, ReponseOptionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
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
  currentQuestionIndex = 0;
  quizFinished = false;
  userAnswers: Array<number | null> = [];

  loading = false;
  errorMessage = '';

  majoritaireParQuestion: { [questionId: number]: ReponseOptionDTO | null } = {};
  resultsParQuestion: {
    [questionId: number]: {
      questionText: string;
      options: {
        reponse_id: number;
        nombre_votes: number;
        texte_option: string;
        question_id: number;
      }[];
      totalVotes: number;
    };
  } = {};

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  selectSondage(id: number) {
    this.selectedSondageId = id;
    this.loadQuestions();
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  loadQuestions() {
    if (!this.selectedSondageId) return;

    this.loading = true;
    this.quizService.getQuestionsBySondage(this.selectedSondageId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.userAnswers = new Array(questions.length).fill(null);
        this.currentQuestionIndex = 0;
        this.quizFinished = false;
        this.errorMessage = '';
        this.loading = false;

        this.calculeOptionMajoritaire();
        this.loadResultsForSondage(this.selectedSondageId!);
      },
      error: () => {
        this.errorMessage = "Erreur lors du chargement des questions.";
        this.loading = false;
      }
    });
  }

  loadResultsForSondage(sondageId: number) {
    this.quizService.getResultsParSondage(sondageId).subscribe({
      next: (results) => this.organizeResultsByQuestion(results),
      error: () => {}
    });
  }

  organizeResultsByQuestion(results: any[]) {
    this.resultsParQuestion = {};

    const optionMap = new Map<number, { texteOption: string; questionId: number }>();

    this.questions.forEach(question => {
      question.options.forEach(option => {
        optionMap.set(option.id, { texteOption: option.texteOption, questionId: option.questionId });
      });

      this.resultsParQuestion[question.id] = { questionText: question.texteQuestion, options: [], totalVotes: 0 };
    });

    results.forEach(result => {
      const optionId = result.reponseId;
      if (!optionId) return;

      const meta = optionMap.get(optionId);
      if (!meta) return;

      this.resultsParQuestion[meta.questionId].options.push({
        reponse_id: optionId,
        nombre_votes: result.nombreVotes,
        texte_option: meta.texteOption,
        question_id: meta.questionId
      });

      this.resultsParQuestion[meta.questionId].totalVotes += result.nombreVotes;
    });
  }

  calculeOptionMajoritaire() {
    this.questions.forEach(question => {
      let maxVotes = -1;
      let optionMajoritaire: ReponseOptionDTO | null = null;

      question.options.forEach(option => {
        const votes = option.resultat?.nombreVotes ?? 0;
        if (votes > maxVotes) {
          maxVotes = votes;
          optionMajoritaire = option;
        }
      });

      if (maxVotes <= 0) optionMajoritaire = null;
      this.majoritaireParQuestion[question.id] = optionMajoritaire;
    });
  }

  selectOption(option: ReponseOptionDTO) {
    this.userAnswers[this.currentQuestionIndex] = option.id;

    this.quizService.voterOption(option.id).subscribe({
      next: () => {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.quizFinished = true;
        }
        this.calculeOptionMajoritaire();
      },
      error: () => {
        alert("Erreur lors de l'envoi du vote.");
        this.quizFinished = true;
      }
    });
  }

  restartQuiz() {
    this.selectedSondageId = null;
    this.quizFinished = false;
    this.questions = [];
    this.userAnswers = [];
    this.currentQuestionIndex = 0;
    this.errorMessage = '';
    this.resultsParQuestion = {};
  }

  getPourcentageVotes(nombreVotes: number, questionId: number): number {
    const questionResults = this.resultsParQuestion[questionId];
    if (!questionResults || questionResults.totalVotes === 0) return 0;
    return Math.round((nombreVotes / questionResults.totalVotes) * 100);
  }

  getVotesForOption(questionId: number, optionId: number): number {
    const questionResults = this.resultsParQuestion[questionId];
    if (!questionResults) return 0;

    const optionResult = questionResults.options.find(o => o.reponse_id === optionId);
    return optionResult ? optionResult.nombre_votes : 0;
  }
}

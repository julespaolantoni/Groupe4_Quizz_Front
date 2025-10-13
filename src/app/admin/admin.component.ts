// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO, ReponseOptionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  sondageId = 1; // ou récupère depuis URL/routage
  questions: QuestionDTO[] = [];
  newQuestionText = '';
  newOptionsText: string[] = ['']; // une option vide par défaut

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizService.getQuestions(this.sondageId).subscribe(data => this.questions = data);
  }

  addOptionField() {
    this.newOptionsText.push('');
  }

  removeOptionField(index: number) {
    this.newOptionsText.splice(index, 1);
  }

  addQuestion() {
    if (!this.newQuestionText.trim() || this.newOptionsText.some(opt => !opt.trim())) {
      alert('Veuillez remplir la question et toutes les options');
      return;
    }

    // Crée la question via backend
    this.quizService.addQuestion(this.sondageId, { texte: this.newQuestionText }).subscribe(question => {
  // Ajoute les options avec { texte_option: text } --> ok selon ton service
  const requests = this.newOptionsText.map(text =>
    this.quizService.addOption(question.id, { texte_option: text })
  );
  Promise.all(requests.map(r => r.toPromise())).then(() => {
    this.newQuestionText = '';
    this.newOptionsText = [''];
    this.loadQuestions();
  });
});

  }
}

import { Component, OnInit } from '@angular/core';
import { QuizService, QuestionDTO } from '../services/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  sondageId = 1;
  questions: QuestionDTO[] = [];
  newQuestionText = '';
  newOptions: string[] = [''];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestionsBySondage(this.sondageId).subscribe((data: QuestionDTO[]) => {
      this.questions = data;
    });
  }

  ajouterQuestion(): void {
    if (!this.newQuestionText.trim()) {
      alert('Veuillez saisir une question.');
      return;
    }
    const filteredOptions = this.newOptions.filter(opt => opt.trim() !== '');
    if (filteredOptions.length === 0) {
      alert('Veuillez ajouter au moins une option.');
      return;
    }

    this.quizService.addQuestion(this.sondageId, { texteQuestion: this.newQuestionText }).subscribe((question) => {
      filteredOptions.forEach(text => {
        this.quizService.addOption(question.id, { texteOption: text }).subscribe();
      });
      this.questions.push(question);
      this.newQuestionText = '';
      this.newOptions = [''];
    });
  }

  ajouterOption(): void {
    this.newOptions.push('');
  }

  removeOptionField(index: number): void {
    if (this.newOptions.length > 1) {
      this.newOptions.splice(index, 1);
    }
  }
}

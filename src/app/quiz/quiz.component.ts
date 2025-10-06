import { Component } from '@angular/core';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  quizCompleted: boolean = false;
  score: number = 0;

  questions: Question[] = [
    {
      question: "Quel est le prénom de la princesse dans 'La Petite Sirène' ?",
      answers: ["Ariel", "Belle", "Jasmine", "Cendrillon"],
      correctAnswer: "Ariel"
    },
    {
      question: "Qui est le méchant dans Le Roi Lion ?",
      answers: ["Simba", "Mufasa", "Scar", "Timon"],
      correctAnswer: "Mufasa"
    },
    {
      question: "Combien d'amis a Dingo ?",
      answers: ["0", "3", "5", "8"],
      correctAnswer: "5"
    }
    // Ajoute plus de questions si tu veux
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  submitAnswer() {
    // Exemple simple : on avance juste à la question suivante
    if(this.selectedAnswer === this.currentQuestion.correctAnswer){
      this.score++;
    }
    this.selectedAnswer = '';
    this.currentQuestionIndex++;
    if(this.currentQuestionIndex >= this.questions.length){
      this.quizCompleted = true;
    }
  }
  restartQuiz() {
  this.score = 0;
  this.currentQuestionIndex = 0;
  this.quizCompleted = false;
  this.currentQuestionIndex = 0;
}

}

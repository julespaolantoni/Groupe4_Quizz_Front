import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private score = 0;
  private totalQuestions = 0;
  private user: string | null = null;

  setScore(score: number, totalQuestions: number) {
    this.score = score;
    this.totalQuestions = totalQuestions;
  }

  getScore() {
    return { score: this.score, totalQuestions: this.totalQuestions };
  }

  setUser(name: string) {
    this.user = name;
  }

  getUser() {
    return this.user;
  }
}

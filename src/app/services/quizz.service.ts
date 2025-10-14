import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private user: string | null = null;
  
  setUser(name: string) {
    this.user = name;
  }

  getUser() {
    return this.user;
  }
}

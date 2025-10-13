import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReponseOptionDTO {
  id: number;
  texte: string;
  // Optionnel: isCorrect?: boolean; // si tu as ça côté backend
}

export interface QuestionDTO {
  id: number;
  texte: string;
  options: ReponseOptionDTO[];
}

export interface SondageDTO {
  id: number;
  titre: string;
  // autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSondage(id: number): Observable<SondageDTO> {
    return this.http.get<SondageDTO>(`${this.baseUrl}/sondages/${id}`);
  }

  getQuestions(sondageId: number): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(`${this.baseUrl}/questions/sondage/${sondageId}`);
  }

  voterOption(optionId: number): Observable<any> {
    // selon ta route préférée, ici on utilise la route dans ResultatController
    return this.http.post(`${this.baseUrl}/resultats/reponses/${optionId}/vote`, {});
  }
  // quiz.service.ts (ajouter ces méthodes)
  addQuestion(sondageId: number, question: { texte: string }) {
  return this.http.post<QuestionDTO>(`${this.baseUrl}/questions/sondage/${sondageId}`, {
    texte_question: question.texte
  });
}

    addOption(questionId: number, option: { texte_option: string }) {
    return this.http.post<ReponseOptionDTO>(`${this.baseUrl}/questions/${questionId}/options`, option);
    }
    getResultsParSondage(sondageId: number) {
    return this.http.get<{ reponse_id: number; nombre_votes: number; texte_option: string }[]>(`${this.baseUrl}/resultats/sondages/${sondageId}`);
    }

}

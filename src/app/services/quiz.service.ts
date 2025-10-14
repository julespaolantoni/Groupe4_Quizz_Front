import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResultatDTO {
  id: number;
  reponseId: number;
  nombreVotes: number;
}

export interface ReponseOptionDTO {
  id: number;
  texteOption: string;
  questionId: number;
  resultat: ResultatDTO;
}

export interface QuestionDTO {
  id: number;
  texteQuestion: string;
  sondageId: number;
  options: ReponseOptionDTO[];
}
export interface NewOption {
  texteOption: string;
  nombreVotes: number;
}
export interface OptionDTO {
  id: number;
  texteOption: string;
  resultat?: {
    nombreVotes: number;
  };
}
export interface SondageDTO {
  id: number;
  titre: string;       // Correspond au champ backend 'titre'
  categorie: any;       // Tu peux typer plus précisément si tu veux
  description?: string;
  dateCreation?: string; // ou Date selon ce que tu reçois
  questions?: QuestionDTO[];
}
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getQuestionsBySondage(sondageId: number): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(`${this.baseUrl}/questions/sondage/${sondageId}`);
  }

  addQuestion(question: QuestionDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(
      `${this.baseUrl}/questions/sondage/${question.sondageId}`,
      question
    );
  }



  addOption(questionId: number, option: NewOption): Observable<OptionDTO> {
    return this.http.post<OptionDTO>(`${this.baseUrl}/questions/${questionId}/options`, option);
  }

  voterOption(optionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/resultats/reponses/${optionId}/vote`, {});
  }

  getResultsParSondage(sondageId: number): Observable<{ reponse_id: number; nombre_votes: number; texte_option: string; question_id: number }[]> {
    return this.http.get<{ reponse_id: number; nombre_votes: number; texte_option: string; question_id: number }[]>(`${this.baseUrl}/resultats/sondages/${sondageId}`);
  }
  getSondages(): Observable<SondageDTO[]> {
    return this.http.get<SondageDTO[]>(`${this.baseUrl}/sondages`);
  }
}

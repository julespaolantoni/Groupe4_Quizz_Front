import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizService, QuestionDTO } from './quiz.service';

export interface ResultatParOption {
  reponse_id: number;
  nombre_votes: number;
  texte_option: string;
  question_id: number;
}

export interface ResultsByQuestion {
  [questionId: number]: {
    questionText: string;
    options: ResultatParOption[];
    totalVotes: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private quizService: QuizService) {}

  loadQuestionsAndResults(sondageId: number): Observable<{
    questions: QuestionDTO[];
    resultsByQuestion: ResultsByQuestion;
  }> {
    return forkJoin({
      questions: this.quizService.getQuestionsBySondage(sondageId),
      results: this.quizService.getResultsParSondage(sondageId),
    }).pipe(
      map(({ questions, results }) => {
        const resultsByQuestion = this.organizeResultsByQuestion(questions, results);
        return { questions, resultsByQuestion };
      })
    );
  }

  private organizeResultsByQuestion(
    questions: QuestionDTO[],
    results: ResultatParOption[]
  ): ResultsByQuestion {
    const resultsByQuestion: ResultsByQuestion = {};

    // Map optionId => texteOption, questionId
    const optionMap = new Map<number, { texteOption: string; questionId: number }>();

    questions.forEach(question => {
      question.options.forEach(option => {
        optionMap.set(option.id, {
          texteOption: option.texteOption,
          questionId: option.questionId,
        });
      });

      resultsByQuestion[question.id] = {
        questionText: question.texteQuestion,
        options: [],
        totalVotes: 0,
      };
    });

    results.forEach(result => {
      const meta = optionMap.get(result.reponse_id);
      if (meta) {
        resultsByQuestion[meta.questionId].options.push({
          reponse_id: result.reponse_id,
          nombre_votes: result.nombre_votes,
          texte_option: meta.texteOption,
          question_id: meta.questionId,
        });
        resultsByQuestion[meta.questionId].totalVotes += result.nombre_votes;
      }
    });

    return resultsByQuestion;
  }

  getPercentage(optionVotes: number, totalVotes: number): number {
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes / totalVotes) * 100);
  }
}

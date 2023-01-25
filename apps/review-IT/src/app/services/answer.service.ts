import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Answer } from '../components/answer/models/answer';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private http = inject(HttpClient);
  private apiUrl = env.apiUrl;

  getAnswers(postId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}posts/${postId}/answers`);
  }
}

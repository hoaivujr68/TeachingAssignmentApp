import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/feedback';
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  } 

  getFeedback(payload: any): Observable<any> {
    return this.httpClient.post(this.url + '/filter', payload, {
      headers: this.createHeaders()
    });
  }

  // Tạo mới Feedback
  createFeedback(payload: any): Observable<any> {
    return this.httpClient.post(this.url, payload, {
      headers: this.createHeaders()
    });
  }

  // Cập nhật Feedback
  updateFeedback(id: string, payload: any): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, payload, {
      headers: this.createHeaders()
    });
  }

  // Lấy Feedback theo Id
  getFeedbackById(id: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`, {
      headers: this.createHeaders()
    });
  }

  // Xóa Feedback theo Id
  deleteFeedbackById(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers: this.createHeaders()
    });
  }

}

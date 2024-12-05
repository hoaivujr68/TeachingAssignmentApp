import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachingAssigmentService {
  private url: string = 'https://localhost:7286/api/teaching-assignment';
  
  constructor(private httpClient: HttpClient) {}

  // Phương thức giúp tạo HttpHeaders với Bearer token
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Filter teaching assignments
  getTeachingAssignmentFilter(payload: any): Observable<any> {
    return this.httpClient.post(`${this.url}/filter-assignment`, payload, {
      headers: this.createHeaders()
    });
  }

  // Filter teaching assignments chưa được phân công
  getTeachingNotAssignmentFilter(payload: any): Observable<any> {
    return this.httpClient.post(`${this.url}/filter-not-assignment`, payload, {
      headers: this.createHeaders()
    });
  }

  getTeacherNotAssignmentFilter(payload: any): Observable<any> {
    return this.httpClient.post(`${this.url}/teacher-not-assignment`, payload, {
      headers: this.createHeaders()
    });
  }

  // Phương thức này để lấy các teaching assignments
  teachingAssignment(): Observable<any> {
    return this.httpClient.get('https://localhost:7286/api/assignment/teaching', {
      headers: this.createHeaders()
    });
  }

  exportTeachingAssignment() {
    return this.httpClient.get(this.url + '/export', {
      headers: this.createHeaders(),
      responseType: 'blob' 
    });
  }
}


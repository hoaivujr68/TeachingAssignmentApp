import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectAssigmentService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/project-assignment';
  }
 
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
  }

  getProjectAssignmentFilter(payload: any): Observable<any> {  
    return this.httpClient.post(this.url + '/filter-assignment', payload, {
      headers: this.createHeaders()
    });
  }

  getProjectNotAssignmentFilter(payload: any): Observable<any> {  
    return this.httpClient.post(this.url + '/filter-not-assignment', payload, {
      headers: this.createHeaders()
    });
  }

  getTeacherNotAssignmentFilter(payload: any): Observable<any> {  
    return this.httpClient.post(this.url + '/teacher-not-assignment', payload, {
      headers: this.createHeaders()
    });
  }

  updateProjectAssignment(payload: any): Observable<any> {
    return this.httpClient.put(`${this.url}`, payload, {
      headers: this.createHeaders()
    });
  }

  getTeacherByStudentFilter(payload: any): Observable<any> {
    return this.httpClient.post(`${this.url}/teacher-by-student`, payload, {
      headers: this.createHeaders()
    });
  }

  getTotalGdByTeacherCode(payload: any): Observable<any> {
    return this.httpClient.post(`${this.url}/total-gd`, payload, {
      headers: this.createHeaders()
    });
  }


  projectAssignment(){
    return this.httpClient.get('https://localhost:7286/api/assignment/aspirating', {
      headers: this.createHeaders()
    });
  }

  rangeGdInstruct(): Observable<any> {
    return this.httpClient.get(`${this.url}/range`, {
      headers: this.createHeaders()
    });
  }

  exportProjectAssignment() {
    return this.httpClient.get(this.url + '/export', {
      headers: this.createHeaders(),
      responseType: 'blob'  // Đảm bảo API trả về kiểu file binary
    });
  }

  exportAspirationAssignment() {
    return this.httpClient.get(this.url + '/export-aspiration', {
      headers: this.createHeaders(),
      responseType: 'blob'  // Đảm bảo API trả về kiểu file binary
    });
  }
   
}

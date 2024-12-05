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
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

  projectAssignment(){
    return this.httpClient.get('https://localhost:7286/api/assignment/aspirating', {
      headers: this.createHeaders()
    });
  }

  exportProjectAssignment() {
    return this.httpClient.get(this.url + '/export', {
      headers: this.createHeaders(),
      responseType: 'blob'  // Đảm bảo API trả về kiểu file binary
    });
  }
   
}

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
  token = localStorage.getItem('access_token');  

  getAllProjectAssignment(page: number, size: number, queryString: string,): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.get(this.url + '/assignment' + '?page=' + page + '&size=' + size + '&filter=' +queryString, { headers });
  }

  getProjectAssignmentFilter(payload: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.post(this.url + '/filter-assignment', payload, { headers });
  }

  getAllProjectNotAssignment(page: number, size: number, queryString: string,): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.get(this.url + '/not-assignment' + '?page=' + page + '&size=' + size + '&filter=' +queryString, { headers });
  }

  getProjectNotAssignmentFilter(payload: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.post(this.url + '/filter-not-assignment', payload, { headers });
  }

  projectAssignment(){
    return this.httpClient.get('https://localhost:7286/api/assignment/aspirating');
  }
}

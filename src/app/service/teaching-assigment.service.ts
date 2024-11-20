import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachingAssigmentService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/teaching-assignment';
  }

  getAllTeachingAssignment(page: number, size: number, queryString: string,): Observable<any> {
    return this.httpClient.get(this.url + '/assignment' + '?page=' + page + '&size=' + size + '&filter=' +queryString);
  }

  getTeachingAssignmentFilter(payload: any): Observable<any> {
    return this.httpClient.post(this.url + '/filter-assignment', payload);
  }

  getAllTeachingNotAssignment(page: number, size: number, queryString: string,): Observable<any> {
    return this.httpClient.get(this.url + '/not-assignment' + '?page=' + page + '&size=' + size + '&filter=' +queryString);
  }

  getTeachingNotAssignmentFilter(payload: any): Observable<any> {
    return this.httpClient.post(this.url + '/filter-not-assignment', payload);
  }

  teachingAssignment(){
    return this.httpClient.get('https://localhost:7286/api/assignment/teaching');
  }
}

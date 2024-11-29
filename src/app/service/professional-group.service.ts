import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalGroupService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/professional-group';
  }
  token = localStorage.getItem('access_token');  

  getProfessionalGroup(page: number, size: number, queryString: string,): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size + '&filter=' +queryString, { headers });
  }

  getProfessionalGroupFilter(payload: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.post(this.url + '/filter', payload, { headers });
  }
}

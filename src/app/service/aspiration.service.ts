import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AspirationService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/aspiration';
  }
  token = localStorage.getItem('access_token');  

  getAllAspiration(page: number, size: number, queryString: string,): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size + '&filter=' +queryString, { headers });
  }

  getAspirationFilter(payload: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    return this.httpClient.post(this.url + '/filter', payload, { headers });
  }

  importFile(file: File): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);  
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(this.url + '/import', formData, { headers });
  }
}

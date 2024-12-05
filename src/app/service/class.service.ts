import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/class';
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  } 

  getClassFilter(payload: any): Observable<any> { 
    return this.httpClient.post(this.url + '/filter', payload, {
      headers: this.createHeaders()
    });
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
 
    return this.httpClient.post(this.url + '/import', formData, {
      headers: this.createHeaders()
    });
  }
}

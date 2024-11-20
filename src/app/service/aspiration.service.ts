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

  getAllAspiration(page: number, size: number, queryString: string,): Observable<any> {
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size + '&filter=' +queryString);
  }

  getAspirationFilter(payload: any): Observable<any> {
    return this.httpClient.post(this.url + '/filter', payload);
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(this.url + '/import', formData);
  }
}

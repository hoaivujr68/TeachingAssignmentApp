import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/general';
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'); // Thêm Content-Type
  }  

  getETLGeneral(payload: any): Observable<any> { 
    return this.httpClient.post(this.url, payload, {
      headers: this.createHeaders()
    });
  }

  refreshETLGeneral(): Observable<any> { 
    return this.httpClient.post(this.url + '/refresh', {
      headers: this.createHeaders()
    });
  }
}

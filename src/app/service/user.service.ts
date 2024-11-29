import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/';
  }

  signUp(payload: any): Observable<any> {
    return this.httpClient.post(this.url + 'sign-up', payload);
  }

  signIn(payload: any): Observable<any> {
    return this.httpClient.post(this.url + 'sign-in', payload);
  }
}

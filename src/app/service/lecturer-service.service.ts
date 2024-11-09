import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerServiceService {
  url: string = '';
  constructor(private httpClient: HttpClient) {
    this.url = 'https://localhost:7286/api/teacher';
  }

  getTeacher(page: number, size: number, queryString: string,): Observable<any> {
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size + '&filter=' +queryString);
  }
}

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

  downloadTemplateClass(): void {
    const url = `${this.url}/download-template`;
    this.httpClient.get(url, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'ClassTemplate.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      error: (err) => {
        console.error('Error downloading the template', err);
      },
    });
  }
}

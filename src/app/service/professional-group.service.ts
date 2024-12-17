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

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  } 

  getProfessionalGroupFilter(payload: any): Observable<any> {
    return this.httpClient.post(this.url + '/filter', payload, {
      headers: this.createHeaders()
    });
  }

  downloadTemplateProfessional(): void {
    const url = `${this.url}/download-template`;
    this.httpClient.get(url, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'ProfessionalTemplate.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      error: (err) => {
        console.error('Error downloading the template', err);
      },
    });
  }
}

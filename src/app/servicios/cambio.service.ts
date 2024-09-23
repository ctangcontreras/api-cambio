import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CambioService {
  private apiUrl = 'http://localhost:9191/tipoCambio';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findAll`).pipe(
      catchError(this.handleError)
    )
  }

  getTipo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PEN`).pipe(
      catchError(this.handleError)
    )
  }


  convert(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

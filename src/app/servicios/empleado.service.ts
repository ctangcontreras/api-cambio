import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:9191/empleado';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEmpleados`).pipe(
      catchError(this.handleError)
    )
  }


  getEmpleadoById(data: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEmplado/${data}`).pipe(
      catchError(this.handleError)
    );
  }

  saveEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, empleado).pipe(
      catchError(this.handleError)
    );
  }

  updateEmpleado(empleado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar/${empleado.idEmpleado}`, empleado).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmpleado(idEmpleado: number, empleado:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idEmpleado}`, { body: empleado }).pipe(
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

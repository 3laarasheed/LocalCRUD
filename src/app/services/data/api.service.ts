import { Student } from './../../models/student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  // HTTP options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handelError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message)
    }
    else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was ${error.error}`);
    }
    return throwError(
      'something went wrong, please try again later'
    );
  }

  // get students list
  getList(): Observable<Student> {
    return this.http.get<Student>(this.base_path)
      .pipe(
        retry(3),
        catchError(this.handelError)
      )
  }


  // get single student by id
  getItem(id): Observable<Student> {
    return this.http.get<Student>(this.base_path + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handelError)
      )
  }

  // create new student 
  createItem(item): Observable<Student> {
    return this.http
      .post<Student>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handelError)
      )
  }

  // update student
  updateItem(id, item): Observable<Student> {
    return this.http
      .put<Student>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handelError)
      )
  }

  //delete student
  deleteItem(id) {
    return this.http.delete<Student>(this.base_path + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handelError)
    )
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";

@Injectable()
export class DataService {

  constructor(public httpClient: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      catchError((err: HttpErrorResponse) =>
        throwError(() => new Error(err.message))
      ),
      finalize(() => (
        console.log('finalizing get')
      ))
    )
  }

  patch<T>(url: string, data: T): Observable<any> {
    return this.httpClient.patch(url, data).pipe(
      catchError((err: HttpErrorResponse) =>
        throwError(() => new Error(err.message))
      ),
      finalize(() => (
        console.log('finalizing patch')
      ))
    )
  }
}

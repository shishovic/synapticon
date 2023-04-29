import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class DataService {

  constructor(public httpClient: HttpClient, public toastrService: ToastrService) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)))
  }

  patch<T>(url: string, data: T): Observable<any> {
    return this.httpClient.patch(url, data).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err))
    )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      this.toastrService.error(err.error.message, 'Error')
      return err;
    })
  }
}

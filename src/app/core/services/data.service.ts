import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from "rxjs";
import { ENV_CONFIG, EnvironmentConfig } from 'src/app/config/environment.config';
import { UpdateDeviceParameterDto } from '../models';

@Injectable()
export class DataService {
  public apiUrl: string;

  constructor(
    @Inject(ENV_CONFIG) config: EnvironmentConfig,
    public httpClient: HttpClient,
    public toastrService: ToastrService
  ) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  get<T>(url: string): Observable<T> {
    const requestUrl = this.apiUrl.concat(url);
    return this.httpClient.get<T>(requestUrl)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
  }

  patch<T>(url: string, data: T): Observable<UpdateDeviceParameterDto> {
    const requestUrl = this.apiUrl.concat(url);
    return this.httpClient.patch<UpdateDeviceParameterDto>(requestUrl, data)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err)
  }
}

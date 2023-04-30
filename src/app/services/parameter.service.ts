import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, retry, throwError, timer } from "rxjs";
import { ENV_CONFIG, EnvironmentConfig } from "../config/environment.config";
import { DeviceParameters, ParameterValue, UpdateDeviceParameterDto } from "../core/models";
import { DataService } from "../core/services/data.service";
import { takeRandom } from "../core/utils";
import { DeviceParameterRoutes } from "../routes/device-parameter.routes";

@Injectable()
export class ParameterService extends DataService {
  constructor(
    @Inject(ENV_CONFIG) config: EnvironmentConfig,
    httpClient: HttpClient,
    toastrService: ToastrService
  ) {
    super(config, httpClient, toastrService);
  }

  getDeviceParameterById(id: string): Observable<DeviceParameters> {
    const url = DeviceParameterRoutes.DEVICE_PARAMETER_BY_ID(id);
    return super.get<DeviceParameters>(url);
  }

  getRandomDeviceParameter(deviceId: string): Observable<DeviceParameters> {
    const url = DeviceParameterRoutes.PARAMETERS_BY_DEVICE_ID(deviceId);
    return super.get<DeviceParameters>(url).pipe(takeRandom());
  }

  updateDeviceParameter(value: ParameterValue, id: string): Observable<UpdateDeviceParameterDto> {
    const patchUrl = DeviceParameterRoutes.DEVICE_PARAMETER_BY_ID(id);
    return super.patch(patchUrl, { value })
      .pipe(
        retry({ count: 1, delay: this.shouldRetry }),
        catchError((err) => this.handleErrors(err))
      );
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    if (err.status === 500) {
      this.toastrService.error('There was an error with your request', 'Internal Server Error')
    }
    if (err.status === 400) {
      this.toastrService.error(err.message, 'Not found')
    }
    return throwError(() => new Error(err.message));
  }
  // if we want to retry a request that timed out
  private shouldRetry(error: HttpErrorResponse): Observable<0> {
    return error.status === 408 ? timer(1000) : throwError(() => error);
  }
}

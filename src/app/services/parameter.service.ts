import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ENV_CONFIG, EnvironmentConfig } from "../config/environment.config";
import { DeviceParameters, ParameterValue } from "../core/models";
import { DataService } from "../core/services/data.service";
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

  getDeviceParameterById(paramId: string): Observable<DeviceParameters> {
    const url = DeviceParameterRoutes.DEVICE_PARAMETER_BY_ID(paramId);
    return super.get(url)
  }

  updateParameter(value: ParameterValue, paramId: string): Observable<any> {
    const patchUrl = DeviceParameterRoutes.DEVICE_PARAMETER_BY_ID(paramId);
    return super.patch(patchUrl, { value });
  }
}

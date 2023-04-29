import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { DeviceParameters, ParameterValue } from "../core/models";
import { DataService } from "../core/services/data.service";

@Injectable()
export class ParameterService extends DataService {
  baseUrl = 'http://localhost:3000'

  constructor(httpClient: HttpClient, toastrService: ToastrService) {
    super(httpClient, toastrService);
  }

  getDeviceParameterById(paramId: string): Observable<DeviceParameters> {
    const url = this.baseUrl.concat(`/device-parameters/${paramId}`);
    return super.get(url)
  }

  updateParameter(value: ParameterValue, paramId: string): Observable<any> {
    const patchUrl = this.baseUrl.concat(`/device-parameters/${paramId}`);
    return super.patch(patchUrl, { value });
  }
}

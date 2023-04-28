import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeviceParameters } from "../core/models";
import { DataService } from "../core/services/data.service";

@Injectable()
export class ParameterService extends DataService {
  baseUrl = 'http://localhost:3000'

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getDeviceParameterById(paramId: string): Observable<DeviceParameters> {
    const url = this.baseUrl.concat(`/device-parameters/${paramId}`);
    return super.get(url)
  }
}

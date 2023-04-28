import { Component } from "@angular/core";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/core/components/base.component";
import { DeviceParameter } from "src/app/core/models";
import { ParameterService } from "src/app/services/parameter.service";

@Component({
  selector: 'angie-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent extends BaseComponent {

  parameterId: string = '';
  deviceParameter?: DeviceParameter;

  constructor(readonly paramService: ParameterService) {
    super();
  }

  getById(): any {
    this.paramService
      .getDeviceParameterById(this.parameterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.deviceParameter = param;
      })
  }
}

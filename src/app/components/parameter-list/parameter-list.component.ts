import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/core/components/base.component";
import { DeviceParameters, ParameterValue } from "src/app/core/models";
import { ParameterService } from "src/app/services/parameter.service";

@Component({
  selector: 'angie-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent extends BaseComponent implements OnInit {

  parameterId: string = '0x1005:00.9500-02-0008895-1950';
  deviceParameter?: DeviceParameters;

  constructor(readonly paramService: ParameterService) {
    super();
  }

  ngOnInit(): void {
    this.paramService
      .getDeviceParameterById(this.parameterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.deviceParameter = param;
      })
  }

  getById(): any {
    this.paramService
      .getDeviceParameterById(this.parameterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.deviceParameter = param;
      })
  }

  update(paramValue: ParameterValue): void {
    console.log(paramValue, 'BLA CALLED')
  }
}

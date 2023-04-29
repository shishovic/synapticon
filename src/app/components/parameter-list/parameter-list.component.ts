import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
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
  formControl: FormControl<any> = new FormControl('0x2038:03.8502-03-0001353-2115')
  deviceParameter?: DeviceParameters;

  constructor(
    readonly paramService: ParameterService,
    private toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formControl.setValue(this.formControl.getRawValue());
    this.getById();
  }

  getById(): void {
    this.paramService
      .getDeviceParameterById(this.formControl.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe((param: DeviceParameters) => this.deviceParameter = param)
  }

  update(paramValue: ParameterValue): void {
    const paramId = this.formControl.getRawValue();
    this.paramService
      .updateParameter(paramValue, paramId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.toastrService.success('Device parameter succesfully updated', 'Success'))
  }

}

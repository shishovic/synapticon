import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { takeUntil, takeWhile } from "rxjs";
import { BaseComponent } from "src/app/core/components/base.component";
import { DeviceParameters, ParamUpdateEventPayload } from "src/app/core/models";
import { ParameterService } from "src/app/services/parameter.service";

/**
 * This component acts as a wrapper to the DeviceParameter component and
 * handles fetching/updating our parameter(s) of our one DeviceParam or many
 * in the future
 */
@Component({
  selector: 'angie-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent extends BaseComponent {
  deviceId: string = '9500-02-0008895-1950';

  formControl: FormControl<any> = new FormControl('0x2038:03.8502-03-0001353-2115')
  parameter!: DeviceParameters;

  constructor(
    readonly paramService: ParameterService,
    private toastrService: ToastrService
  ) {
    super();
  }

  private get form(): FormControl {
    return this.formControl;
  }

  getDeviceParamById(paramId: string): void {
    this.validateForm(!this.form.value?.length);

    this.paramService
      .getDeviceParameterById(paramId)
      .pipe(takeUntil(this.destroy$), takeWhile(() => this.form.valid))
      .subscribe(param => this.parameter = param)
  }

  private validateForm(hasErrors: boolean): void {
    const errors = hasErrors ? { required: true } : {};
    this.form.setErrors(errors)
    if (!hasErrors) this.form.updateValueAndValidity();
  }
  // convenient for development and testing;
  // leaving it in for presentation purposes;
  getRandomDeviceParam(): void {
    this.validateForm(false);

    this.paramService
      .getRandomDeviceParameter(this.deviceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.parameter = res)
  }

  update({ value, id }: ParamUpdateEventPayload): void {
    this.paramService
      .updateDeviceParameter(value, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.toastrService.success('Device parameter succesfully updated', 'Success'))
  }

}

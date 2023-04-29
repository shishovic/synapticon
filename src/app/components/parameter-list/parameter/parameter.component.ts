import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { BaseComponent } from "src/app/core/components/base.component";
import { DeviceParameters, KeyOf, ParameterAccess, ParameterValue, ValueOf } from "src/app/core/models";

@Component({
  selector: 'angie-device-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceParameterComponent extends BaseComponent {
  formControl: FormControl = new FormControl('');
  name: string = '';

  parameter?: DeviceParameters;

  @Output() update: EventEmitter<ParameterValue> = new EventEmitter<ParameterValue>();

  @Input() set parameters(parameters: DeviceParameters) {
    if (!!parameters) {
      const { value, access, name, index, subindex } = parameters;
      this.parameter = parameters;
      this.name = this.composeParamName(name, index, subindex);

      this.formControl.setValue(value);
      this.formControl.setValidators(this.getValidators(parameters))

      access === ParameterAccess.READONLY
        ? this.formControl.disable()
        : this.formControl.enable()
    };
  }

  public getFormErrors(): any[] {
    return Object.keys(this.formControl.errors || {})
  }

  public getErrorMessage(e: KeyOf<ValidationErrors>): ValueOf<ValidationErrors> {
    const messages: ValidationErrors = {
      required: 'Value field is required',
      min: `Invalid value. Minimum value must be more than ${this.parameter?.min}`,
      max: `Invalid value.  Maximum value must be less or equal than ${this.parameter?.max}`
    };
    return messages[e];
  }

  public updateParameter(): void {
    if (this.formControl.invalid) return;

    const isString = typeof this.parameter?.value === 'string';
    const value = this.formControl.getRawValue();
    this.update.next(isString ? String(value) : Number(value))
  }

  private getValidators(parameters: DeviceParameters): ValidatorFn[] {
    const { min, max, mandatory } = parameters;
    const validators: ValidatorFn[] = [];

    if (typeof min !== 'undefined') validators.push(Validators.min(min));
    if (typeof max !== 'undefined') validators.push(Validators.max(max));
    if (mandatory) validators.push(Validators.required);

    return validators;
  }

  private composeParamName(name: string, index: number, subindex: number): string {
    return `${index}:${subindex}: ${name}`
  }
}

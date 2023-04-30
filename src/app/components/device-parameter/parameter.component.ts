import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { DeviceParameters, KeyOf, ParamUpdateEventPayload, ParameterAccess, ValueOf } from "src/app/core/models";


/**
 * This component should be as simple as possible, ideally
 * only with logic concerning the presentational layer;
 *
 * This gives us the ability to performantly display many of these
 * components simultaneosly, especially in a short-interval monitoring
 * scenario that's our common usecase.
 */
@Component({
  selector: 'angie-device-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceParameterComponent {
  public parameter!: DeviceParameters;

  public formControl: FormControl = new FormControl('');
  public name: string = '';

  @Output() update: EventEmitter<ParamUpdateEventPayload> = new EventEmitter();
  @Input() set parameters(params: DeviceParameters) {
    if (!params) return;

    const { value, access, name, index, subindex } = params;
    this.parameter = params;
    this.name = this.composeParamName(name, index, subindex);

    this.formControl.setValue(value);
    this.formControl.setValidators(this.getValidators(params))

    access === ParameterAccess.READONLY
      ? this.formControl.disable()
      : this.formControl.enable()
  }

  get form(): FormControl {
    return this.formControl;
  }

  public getFormErrors(): any[] {
    return Object.keys(this.formControl.errors || {})
  }

  public getErrorMessage(e: KeyOf<ValidationErrors>): ValueOf<ValidationErrors> {
    const messages: ValidationErrors = {
      required: 'Value field is required',
      min: `Invalid value. Minimum value must be more than ${this.parameter.min}`,
      max: `Invalid value.  Maximum value must be less or equal than ${this.parameter.max}`
    };
    return messages[e];
  }

  public updateParameter(): void {
    if (this.form.invalid) return;

    const isString = typeof this.parameter.value === 'string';
    const value = this.form.getRawValue();
    this.update.next({
      value: isString ? String(value) : Number(value),
      id: this.parameter?.id
    })
  }

  private getValidators(params: DeviceParameters): ValidatorFn[] {
    const { min, max, mandatory } = params;
    const validators: ValidatorFn[] = [];

    if (typeof min !== 'undefined') validators.push(Validators.min(min));
    if (typeof max !== 'undefined') validators.push(Validators.max(max));
    if (mandatory) validators.push(Validators.required);

    return validators;
  }

  private composeParamName(name: string, index: number, subindex: number): string {
    return `${index}:${subindex}${name ? `: ${name}` : ''}`
  }
}

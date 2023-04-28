import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseComponent } from "src/app/core/components/base.component";
import { DeviceParameters, ParameterAccess, ParameterValue } from "src/app/core/models";

@Component({
  selector: 'angie-device-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceParameterComponent extends BaseComponent {
  parameter: DeviceParameters | undefined;
  value?: ParameterValue;
  disabled: boolean = false;
  required: boolean = false;
  name: string = '';

  @Output() update: EventEmitter<ParameterValue> = new EventEmitter<ParameterValue>();

  @Input() set parameters(parameters: DeviceParameters) {
    if (!!parameters) {
      const { value, access, mandatory, name, index, subindex } = parameters;
      this.parameter = parameters;
      this.value = value;
      this.disabled = access === ParameterAccess.READONLY;
      this.required = mandatory;
      this.name = this.composeParamName(name, index, subindex);
    };
  }

  updateParameter(): void {
    this.update.next(this.value as ParameterValue)
  }

  private composeParamName(name: string, index: number, subindex: number): string {
    return `${index}:${subindex}: ${name}`
  }
}

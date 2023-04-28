export type DeviceParameter = {
  id: string;
  deviceId: string;
  name: string;
  type: ParameterType;
  value: ParameterValue;
  mandatory: boolean;
  access: ParameterAccess;
  min?: number;
  max?: number;
  unit?: string;
  options?: ParameterOptions;
  description?: string;
}

export type Device = {
  id: string;
  name: string;
  haradwareDescription?: DeviceHardwareDescription
}

export type DeviceHardwareDescription = {
  fileVersion: string;
  device: HardwareDescriptionDevice;
  description?: string;
}

export type HardwareDescriptionDevice = {
  macAddress: string;
  serialNumber: string;
  name: string;
  id: string;
  version: string;
  components: HardwareDescriptionDeviceComponent[]
}

export type HardwareDescriptionDeviceComponent = {
  name: string;
  version: string;
  serialNumber: string;
}

export enum ParameterType {
  BOOLEAN,
  INTEGER8,
  INTEGER16,
  INTEGER32,
  UNSIGNED8,
  UNSIGNED16,
  UNSIGNED32,
  REAL32,
  VISIBLE_STRING,
  OCTET_STRING,
  UNICODE_STRING
}

export type ParameterValue = string | number;

export enum ParameterAccess {
  READONLY = 'ro',
  READWRITE = 'rw',
  WRITEONLY = 'wo'
}

export interface ParameterOptions {
  description: string;
}

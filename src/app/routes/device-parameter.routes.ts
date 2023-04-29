export class DeviceParameterRoutes {
  static DEVICE_PARAMETER_BY_ID = (paramId: string): string => `/device-parameters/${paramId}`;
  static PARAMETERS_BY_DEVICE_ID = (deviceId: string): string => `/devices/${deviceId}/parameters`;
}

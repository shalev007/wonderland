export const DeviceHealthStatusEnum = {
  HEALTHY: 'HEALTHY',
  WARN: 'WARN',
  FAIL: 'FAIL',
  OFFLINE: 'OFFLINE',
  NOT_READY: 'NOT_READY',
  UNDEFINED: 'UNDEFINED',
} as const;

export type DeviceHealthStatusEnum =
  (typeof DeviceHealthStatusEnum)[keyof typeof DeviceHealthStatusEnum];

export const DeviceAvailabilityStatusEnum = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
} as const;

export type DeviceAvailabilityStatusEnum =
  (typeof DeviceAvailabilityStatusEnum)[keyof typeof DeviceAvailabilityStatusEnum];

export enum CameraType {
  SIMPLE_PTZ = 'SIMPLE_PTZ',
  THERMAL_PTZ = 'THERMAL_PTZ',
}

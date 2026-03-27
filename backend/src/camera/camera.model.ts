import { CameraType } from '@/enum/enums';

export interface Camera {
  id: number;
  type: CameraType;
  ip: string;
  username: string;
  password?: string;
  getHighResSource(): string;
  getLowResSource(): string;
}

export abstract class BaseCamera implements Camera {
  constructor(
    public id: number,
    public type: CameraType,
    public ip: string,
    public username: string,
    public password?: string,
  ) {}

  abstract getHighResSource(): string;
  abstract getLowResSource(): string;
}

export class SimplePtzCamera extends BaseCamera {
  getHighResSource(): string {
    return `rtsp://${this.username}:${this.password}@${this.ip}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`;
  }

  getLowResSource(): string {
    return `rtsp://${this.username}:${this.password}@${this.ip}:554/cam/realmonitor?channel=1&subtype=1&unicast=true&proto=Onvif`;
  }
}

export class ThermalPtzCamera extends BaseCamera {
  getHighResSource(): string {
    return `rtsp://${this.username}:${this.password}@${this.ip}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`;
  }

  getLowResSource(): string {
    return `rtsp://${this.username}:${this.password}@${this.ip}:554/cam/realmonitor?channel=1&subtype=1&unicast=true&proto=Onvif`;
  }
}

export const CameraFactory = {
  fromJSON(json: any): Camera {
    switch (json.type) {
      case CameraType.SIMPLE_PTZ:
        return new SimplePtzCamera(json.id, json.type, json.ip, json.username, json.password);
      case CameraType.THERMAL_PTZ:
        return new ThermalPtzCamera(json.id, json.type, json.ip, json.username, json.password);
      default:
        throw new Error(`Unknown camera type: ${json.type}`);
    }
  },
};

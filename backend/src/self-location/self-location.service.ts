import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as persist from 'node-persist';

@Injectable()
export class SelfLocationService implements OnModuleInit {
  private readonly logger = new Logger(SelfLocationService.name);
  private storage: persist.LocalStorage;

  constructor() {
    this.storage = persist.create({
      dir: 'self-location-data',
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf8',
      logging: false,
    });
  }

  async onModuleInit() {
    try {
      await this.storage.init();
      this.logger.log('node-persist initialized successfully for self-location');
    } catch (error) {
      this.logger.error('Failed to initialize node-persist', error);
    }
  }

  async getLocation(): Promise<{ lat: number; lng: number } | null> {
    try {
      const location = await this.storage.getItem('selfLocation');
      return location || null;
    } catch (error) {
      this.logger.error('Failed to get self location', error);
      return null;
    }
  }

  async setLocation(location: { lat: number; lng: number }): Promise<void> {
    try {
      await this.storage.setItem('selfLocation', location);
      this.logger.log(`Self location updated: ${location.lat}, ${location.lng}`);
    } catch (error) {
      this.logger.error('Failed to set self location', error);
    }
  }
}

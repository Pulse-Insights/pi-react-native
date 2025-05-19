// specs/NativePulseInsight.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initialize(config: {
    appId: string;
    userId?: string;
  }): void;

  // trackEvent(eventName: string, properties?: any): void;

}

export default TurboModuleRegistry.getEnforcing<Spec>('NativePulseInsight');

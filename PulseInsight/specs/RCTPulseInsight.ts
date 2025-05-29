// specs/NativePulseInsight.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initialize(config: {
    accountId: string;
    enableDebugMode?: boolean;
    previewMode?: boolean;
    customData?:  { [key: string]: string };
  }): void;
  setAccountID(accountId: string): void;
  setViewName(viewName: string): void;

  setScanFrequency(frequencyInSeconds: number): void;
  serve(): void;

  present(surveyId: string): void;

  switchSurveyScan(enable: boolean): void;
  isSurveyScanWorking(): boolean;

  setClientKey(clientId: string): void;
  getClientKey(): string;

  setPreviewMode(enable: boolean): void;
  isPreviewModeOn(): boolean;

  checkSurveyAnswered(surveyId: string): boolean;

  setContextData(data: { [key: string]: string }, merge?: boolean): void;
  clearContextData(): void;

  setDeviceData(data: { [key: string]: string }): void;

  setHost(hostName: string): void;
  setDebugMode(enable: boolean): void;
  resetUdid(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RCTPulseInsight');

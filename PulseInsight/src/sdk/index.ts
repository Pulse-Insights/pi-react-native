/**
 * PulseInsight React Native SDK
 */

import { NativeModules, Platform } from 'react-native';

const { RCTPulseInsight } = NativeModules;

export interface PulseInsightOptions {
  accountId: string;
  enableDebugMode?: boolean;
  previewMode?: boolean;
  customData?: Record<string, string>;
}

export class PulseInsight {
  private options: PulseInsightOptions;
  private initialized: boolean = false;

  constructor(options: PulseInsightOptions) {
    this.options = options;
  }

  async initialize(): Promise<boolean> {
    try {
      if (!RCTPulseInsight) {
        console.error('PulseInsight native module is not available');
        return false;
      }

      await RCTPulseInsight.initialize({
        accountId: this.options.accountId,
        enableDebugMode: this.options.enableDebugMode || false,
        previewMode: this.options.previewMode || false,
        customData: this.options.customData || {},
      });

      this.initialized = true;
      console.log('PulseInsight SDK initialized with account ID:', this.options.accountId);
      return true;
    } catch (error) {
      console.error('Failed to initialize PulseInsight SDK:', error);
      return false;
    }
  }

  async setAccountID(accountId: string): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setAccountID(accountId);
    } catch (error) {
      console.error(`Failed to set account ID ${accountId}:`, error);
    }
  }

  async trackEvent(eventName: string, properties: Record<string, any> = {}): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setDeviceData(properties);
      console.log(`Event tracked: ${eventName}`, properties);
    } catch (error) {
      console.error(`Failed to track event ${eventName}:`, error);
    }
  }

  // 视图跟踪
  async setViewName(viewName: string): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setViewName(viewName);
    } catch (error) {
      console.error(`Failed to set view name ${viewName}:`, error);
    }
  }

  async setScanFrequency(frequencyInSeconds: number): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setScanFrequency(frequencyInSeconds);
    } catch (error) {
      console.error(`Failed to set scan frequency to ${frequencyInSeconds}:`, error);
    }
  }

  async serve(): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.serve();
    } catch (error) {
      console.error('Failed to serve survey:', error);
    }
  }

  async presentSurvey(surveyId: string): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.present(surveyId);
    } catch (error) {
      console.error(`Failed to present survey ${surveyId}:`, error);
    }
  }

  async enableSurveys(enable: boolean): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.switchSurveyScan(enable);
    } catch (error) {
      console.error(`Failed to ${enable ? 'enable' : 'disable'} surveys:`, error);
    }
  }

  async isSurveysEnabled(): Promise<boolean> {
    try {
      this.ensureInitialized();
      return await RCTPulseInsight.isSurveyScanWorking();
    } catch (error) {
      console.error('Failed to check if surveys are enabled:', error);
      return false;
    }
  }

  async setClientKey(clientKey: string): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setClientKey(clientKey);
    } catch (error) {
      console.error(`Failed to set client key ${clientKey}:`, error);
    }
  }

  async getClientKey(): Promise<string> {
    try {
      this.ensureInitialized();
      return await RCTPulseInsight.getClientKey();
    } catch (error) {
      console.error('Failed to get client key:', error);
      return '';
    }
  }

  async setPreviewMode(enable: boolean): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setPreviewMode(enable);
    } catch (error) {
      console.error(`Failed to ${enable ? 'enable' : 'disable'} preview mode:`, error);
    }
  }

  async isPreviewModeEnabled(): Promise<boolean> {
    try {
      this.ensureInitialized();
      return await RCTPulseInsight.isPreviewModeOn();
    } catch (error) {
      console.error('Failed to check if preview mode is enabled:', error);
      return false;
    }
  }

  async isSurveyAnswered(surveyId: string): Promise<boolean> {
    try {
      this.ensureInitialized();
      return await RCTPulseInsight.checkSurveyAnswered(surveyId);
    } catch (error) {
      console.error(`Failed to check if survey ${surveyId} was answered:`, error);
      return false;
    }
  }

  async setContextData(data: Record<string, string>): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setContextData(data);
    } catch (error) {
      console.error('Failed to set context data:', error);
    }
  }

  async clearContextData(): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.clearContextData();
    } catch (error) {
      console.error('Failed to clear context data:', error);
    }
  }

  async setHost(hostName: string): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setHost(hostName);
    } catch (error) {
      console.error(`Failed to set host to ${hostName}:`, error);
    }
  }

  async setDebugMode(enable: boolean): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.setDebugMode(enable);
    } catch (error) {
      console.error(`Failed to ${enable ? 'enable' : 'disable'} debug mode:`, error);
    }
  }

  async resetUdid(): Promise<void> {
    try {
      this.ensureInitialized();
      await RCTPulseInsight.resetUdid();
    } catch (error) {
      console.error('Failed to reset UDID:', error);
    }
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('PulseInsight SDK is not initialized. Call initialize() first.');
    }
  }
}

export default PulseInsight;

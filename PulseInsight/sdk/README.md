# Pulse Insight React Native SDK Core

This directory contains the core implementation of the Pulse Insight React Native SDK.

## Structure

- `index.ts` - Main SDK implementation and API
- `/components` - React Native components used by the SDK

## API Reference

### Initialization

```javascript
import { PulseInsight } from 'pulse-insight-react-native';

// Initialize the SDK
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: __DEV__, // Optional
  previewMode: false, // Optional
  customData: { /* Custom data */ } // Optional
});

// Initialize the SDK
await pulseInsight.initialize();
```

### Survey Management

```javascript
// Check for available surveys and display them if conditions are met
pulseInsight.serve();

// Track an event
pulseInsight.trackEvent('screen_view', { screen: 'Home' });

// Set view name (for targeting surveys to specific screens)
pulseInsight.setViewName('Home');

// Present a specific survey by ID
pulseInsight.presentSurvey('SURVEY_ID');

// Check if a survey has been answered
const isAnswered = await pulseInsight.isSurveyAnswered('SURVEY_ID');
```

### Context Data

```javascript
// Set custom data
pulseInsight.setContextData({ 
  userId: '12345',
  userType: 'premium'
});

// Clear context data
pulseInsight.clearContextData();
```

### Configuration

```javascript
// Enable/disable debug mode
pulseInsight.setDebugMode(true);

// Enable/disable preview mode
pulseInsight.setPreviewMode(true);

// Set survey scan frequency (in seconds)
pulseInsight.setScanFrequency(30);

// Set client key
pulseInsight.setClientKey('YOUR_CLIENT_KEY');
```

### Advanced

```javascript
// Set custom host
pulseInsight.setHost('custom-survey.yourdomain.com');

// Set device data
pulseInsight.setDeviceData({
  deviceModel: 'iPhone 16',
  osVersion: '17.0',
  appVersion: '1.2.3'
});

// Reset device ID
pulseInsight.resetDeviceId();

// Check if survey rendering is active
const isActive = pulseInsight.isSurveyRenderingActive();

// Switch survey scan on/off
pulseInsight.switchSurveyScan(true);
```

### Event Listeners

```javascript
// Set answer listener
pulseInsight.setAnswerListener((answerId) => {
  console.log(`Survey answered with ID: ${answerId}`);
});
```

## Inline Survey Component

```javascript
import { InlineSurvey } from 'pulse-insight-react-native';

// In your render method
<InlineSurvey
  identifier="SURVEY_ID"
  style={{ width: '100%', height: 300 }}
/>
```

## Development

For information on how to develop and test this SDK, please refer to the [example application README](../README.md).

## License

MIT 
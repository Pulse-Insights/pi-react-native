# Pulse Insight React Native SDK Core

This directory contains the core implementation of the Pulse Insight React Native SDK.

## Structure

- `index.ts` - Main SDK implementation and API
- `/components` - React Native components used by the SDK

## Important Usage Requirements

**Before calling `serve()` or `presentSurvey()` methods, you MUST:**
1. Initialize the SDK with a valid account ID
2. Set a view name for proper survey targeting

Failure to set these required values will result in no surveys being displayed.

## API Reference

### Initialization

```javascript
import { PulseInsight } from 'pulse-insight-react-native';

// Initialize the SDK with required account ID
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',  // REQUIRED
  enableDebugMode: __DEV__,      // Optional
  previewMode: false,            // Optional
  customData: { /* Custom data */ } // Optional
});

// Initialize the SDK
await pulseInsight.initialize();

// REQUIRED: Set a view name for targeting
await pulseInsight.setViewName('YOUR_VIEW_NAME');

// Now you can call serve() or presentSurvey()
await pulseInsight.serve();
```

### Survey Management

```javascript
// REQUIRED: Set view name before calling serve
await pulseInsight.setViewName('home_screen');

// Check for available surveys and display them if conditions are met
await pulseInsight.serve();

// Present a specific survey by ID
await pulseInsight.presentSurvey('SURVEY_ID');

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

## Typical Implementation Flow

1. Initialize SDK with account ID
2. Set view name based on current screen
3. Call serve() to check for and display available surveys
4. Set context data as needed for targeting
5. Update view name when user navigates to a different screen

## Development

For information on how to develop and test this SDK, please refer to the [example application README](../README.md).

## License

MIT 
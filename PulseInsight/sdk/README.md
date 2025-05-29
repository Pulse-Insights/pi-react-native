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
// Track an event
pulseInsight.trackEvent('screen_view', { screen: 'Home' });

// Set view name
pulseInsight.setViewName('Home');

// Present a specific survey
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

## Development

For information on how to develop and test this SDK, please refer to the [example application README](../README.md).

## License

MIT 
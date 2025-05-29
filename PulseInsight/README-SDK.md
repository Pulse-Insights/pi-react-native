# PulseInsight React Native SDK

React Native SDK for PulseInsight analytics and survey platform.

## Installation

```bash
npm install pulse-insight-react-native --save
# or
yarn add pulse-insight-react-native
```

### iOS

The iOS implementation requires CocoaPods to install the native dependencies:

```bash
cd ios && pod install
```

You also need to have the PulseInsights iOS SDK installed. Follow their installation instructions or add to your Podfile:

```ruby
pod 'PulseInsights'
```

## Usage

### Initialization

```typescript
import PulseInsight from 'pulse-insight-react-native';

// Initialize the SDK
const sdk = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: true, // optional
  previewMode: false,    // optional
  customData: {          // optional
    'user_type': 'premium',
    'app_version': '1.0.0'
  }
});

// Initialize the connection to PulseInsight servers
const success = await sdk.initialize();
if (success) {
  console.log('PulseInsight SDK initialized successfully');
} else {
  console.error('Failed to initialize PulseInsight SDK');
}
```

### Tracking and Surveys

```typescript
// Set the current view name
await sdk.setViewName('MainScreen');

// Track custom event
await sdk.trackEvent('button_clicked', { button_id: 'submit_form' });

// Serve surveys (will display if targeting conditions are met)
await sdk.serve();

// Present a specific survey by ID
await sdk.presentSurvey('survey123');
```

### Context Data

```typescript
// Set context data
await sdk.setContextData({
  'user_id': '12345',
  'subscription_tier': 'premium'
});

// Clear context data
await sdk.clearContextData();
```

## API Reference

### PulseInsight Class

Complete API documentation for the PulseInsight class.

### PulseInsightSurvey Component

Props:
- `identifier` (string, required): The unique identifier for the survey
- `style` (ViewStyle, optional): React Native style object for the survey container

## License

MIT 
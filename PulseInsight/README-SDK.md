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

### Inline Surveys

There are two ways to implement inline surveys:

#### 1. Component Approach (Recommended)

Use the `PulseInsightSurvey` component directly in your JSX:

```typescript
import { PulseInsightSurvey } from 'pulse-insight-react-native';

// In your component's render method:
<View style={styles.container}>
  <Text>Your content here</Text>
  
  {/* Inline survey container */}
  <PulseInsightSurvey 
    identifier="survey123"
    style={{ height: 200, width: '100%' }}
  />
  
  <Text>More content below the survey</Text>
</View>
```

#### 2. Imperative API (Legacy)

```typescript
// Set the current view first
await sdk.setViewName('DetailScreen');

// Create an inline survey
await sdk.createInlineSurvey('survey123');

// Trigger the serve mechanism to display the survey
await sdk.serve();
```

The component approach is recommended as it better follows React Native's declarative programming model.

## API Reference

### PulseInsight Class

Complete API documentation for the PulseInsight class.

### PulseInsightSurvey Component

Props:
- `identifier` (string, required): The unique identifier for the survey
- `style` (ViewStyle, optional): React Native style object for the survey container

## License

MIT 
# Pulse Insight React Native SDK

A React Native SDK for integrating Pulse Insight surveys into your mobile applications. This SDK provides a React Native wrapper around our native iOS and Android SDKs.

## Native SDKs

This React Native SDK is built on top of our native SDKs:
- [Android SDK](https://github.com/Pulse-Insights/pi.android)
- [iOS SDK](https://github.com/Pulse-Insights/pi-ios-spm)

## Project Structure

- `/PulseInsight` - Contains the example app and SDK implementation
  - `/sdk` - The actual SDK core implementation
  - `/example` - Example app source code
  - `/ios` and `/android` - Native code for iOS and Android platforms
  - `/specs` - Test specifications

## Installation

```bash
npm install pulse-insight-react-native --save
# or
yarn add pulse-insight-react-native
```

### iOS Setup

Add the following to your Podfile:

```ruby
pod 'pulse-insight-react-native', :path => '../node_modules/pulse-insight-react-native'
```

Then run:

```bash
cd ios && pod install
```

### Android Setup

No additional setup required for Android.

## Usage

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

// Track an event
pulseInsight.trackEvent('screen_view', { screen: 'Home' });

// Set view name
pulseInsight.setViewName('Home');

// Present a specific survey
pulseInsight.presentSurvey('SURVEY_ID');

// Check if a survey has been answered
const isAnswered = await pulseInsight.isSurveyAnswered('SURVEY_ID');

// Set custom data
pulseInsight.setContextData({ 
  userId: '12345',
  userType: 'premium'
});
```

## API Reference

For detailed API documentation, please refer to the [README-SDK.md](/PulseInsight/sdk/README.md) file.

## License

MIT
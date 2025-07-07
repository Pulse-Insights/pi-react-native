# PulseInsight React Native SDK

React Native SDK for integrating PulseInsights surveys into mobile applications.

## Overview

This SDK allows you to easily integrate PulseInsight surveys into your React Native applications, supporting both iOS and Android platforms. It provides components for displaying both popup and inline surveys, with comprehensive customization options.

## Repository Structure

```
pi-react-native/
├── PulseInsight/          # SDK source code
│   ├── sdk/               # Core SDK implementation
│   ├── ios/               # iOS native implementation
│   ├── android/           # Android native implementation
│   └── example/           # Example application
└── README.md              # This file
```

## Quick Installation

```bash
# npm
npm install pulse-insight-react-native

# yarn
yarn add pulse-insight-react-native

# iOS setup
cd ios && pod install
```

## Documentation

- [SDK Documentation](PulseInsight/README.md) - Complete API reference and setup guide
- [Example Application](PulseInsight/example/PIDemo/README.md) - How to run and use the example app

## Basic Usage

```javascript
import { PulseInsight } from 'pulse-insight-react-native';

// Initialize the SDK
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: __DEV__
});

// Initialize and set view name
await pulseInsight.initialize();

// IMPORTANT: You MUST set a view name before calling serve() or presentSurvey()
// The view name is required for proper survey targeting
pulseInsight.setViewName('home_screen');

// Trigger survey scan
pulseInsight.serve();
```

## Requirements

- React Native >= 0.70.0
- iOS 16.0+
- Android API level 21+

## License

MIT License - see [LICENSE](LICENSE) file for details.
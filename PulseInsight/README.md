# Pulse Insight React Native Example

This directory contains an example application that demonstrates how to use the Pulse Insight React Native SDK, as well as the SDK implementation itself.

## Directory Structure

- `/sdk` - The SDK core implementation
- `/example` - Example application source code
- `/ios` - Native iOS code
- `/android` - Native Android code
- `/__tests__` - Test files for the SDK

## Configuration

Before running the example app, you need to replace the placeholder values with your own:

1. In `/example/App.tsx`:
   - Replace `YOUR_ACCOUNT_ID` with your Pulse Insights account ID (e.g., 'PI-12345678')
   - Replace `YOUR_HOST_URL` with your survey host URL (e.g., 'survey.pulseinsights.com')
   - Replace `YOUR_VIEW_NAME` with your main view name for targeting surveys

These values are required for the SDK to connect to your Pulse Insights account and display surveys correctly.

## Development Environment Setup

### Prerequisites

- Node.js (v16 or later)
- Yarn or npm
- For iOS development:
  - macOS
  - Xcode (14.0 or later)
  - CocoaPods
- For Android development:
  - Android Studio
  - JDK 11 or newer
  - Android SDK (API level 21 or higher)

### Installing Dependencies

```bash
# Install JavaScript dependencies
yarn install
# or
npm install

# Install iOS dependencies
cd ios && pod install && cd ..
```

## Running the Example App

### iOS

```bash
# Start Metro bundler
npx react-native start

# Run on iOS simulator
npx react-native run-ios
```

### Android

```bash
# Start Metro bundler
npx react-native start

# Run on Android emulator or device
npx react-native run-android
```

## License

MIT 
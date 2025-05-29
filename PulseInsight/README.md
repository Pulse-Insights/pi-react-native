# Pulse Insight React Native Example

This directory contains an example application that demonstrates how to use the Pulse Insight React Native SDK, as well as the SDK implementation itself.

## Directory Structure

- `/sdk` - The SDK core implementation
- `/example` - Example application source code
- `/ios` - Native iOS code
- `/android` - Native Android code
- `/__tests__` - Test files for the SDK

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
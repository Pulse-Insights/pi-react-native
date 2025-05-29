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

### Android-specific Setup

Before building the Android app, you need to configure the local properties:

1. Navigate to the `/android` directory
2. Copy the `local.properties.example` file to `local.properties`
3. Edit the `local.properties` file and update the Android SDK path to match your system:
   ```properties
   sdk.dir=/path/to/your/Android/sdk
   ```
   Common locations:
   - macOS: `/Users/YOUR_USERNAME/Library/Android/sdk`
   - Windows: `C:\Users\YOUR_USERNAME\AppData\Local\Android\sdk`
   - Linux: `/home/YOUR_USERNAME/Android/sdk`

4. If you're using Java 17, uncomment and update the Java home path in the same file

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
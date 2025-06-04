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

### iOS-specific Setup

The SDK uses CocoaPods to manage dependencies:

1. Make sure you have CocoaPods installed:
   ```bash
   sudo gem install cocoapods
   ```

2. If you encounter any module issues, try cleaning the CocoaPods cache:
   ```bash
   pod cache clean --all
   ```

3. Do NOT manually add PulseInsights as an SPM package in Xcode - the SDK now exclusively uses CocoaPods for dependency management.

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

5. **Important**: The PulseInsights Android SDK is hosted in a custom Maven repository. This repository is configured in the example app, but if you're integrating into your own app, you'll need to add the repository to your project's build configuration:

   ```gradle
   // In your project's root build.gradle or settings.gradle
   allprojects {
       repositories {
           // ... other repositories
           maven {
               url "https://pi-sdk.s3.us-east-1.amazonaws.com/android"
           }
       }
   }
   ```

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

## Troubleshooting

### iOS Build Issues

If you encounter build errors related to missing modules:

1. Make sure you're using CocoaPods and not SPM for dependency management
2. Clean the CocoaPods cache and reinstall:
   ```bash
   cd ios
   pod cache clean --all
   pod install
   ```
3. Clean the Xcode build folder (Product > Clean Build Folder)
4. Restart Xcode

### Android Build Issues

If you see errors like "Could not find com.pulseinsights:android-sdk:2.4.4":

1. Make sure you've added the PulseInsights Maven repository to your project's build configuration as described in the Android-specific Setup section
2. Clean and rebuild your project:
   ```bash
   cd android
   ./gradlew clean
   ```

## License

MIT 
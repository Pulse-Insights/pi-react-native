# Pulse Insight React Native Example

This directory contains an example application that demonstrates how to use the Pulse Insight React Native SDK, as well as the SDK implementation itself.

## Directory Structure

- [/sdk](./sdk) - The SDK core implementation
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
  - Ruby (2.6 or later - macOS comes with Ruby pre-installed)
  - CocoaPods (installed via `sudo gem install cocoapods`)
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

4. If you're using Java 17, go to gradle.properties and update the java.home path to the path of your Java 17 installation.

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

## Quick Start

Here are the complete steps to run the example application from scratch:

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/pi-react-native.git

# Navigate to the project root directory
cd pi-react-native

# Navigate to the PulseInsight directory
cd PulseInsight
```

### 2. Install Dependencies

```bash
# Install JavaScript dependencies
yarn install
# or
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

> **Note for iOS Development**: The iOS setup requires [CocoaPods](https://cocoapods.org/) which is a Ruby-based dependency manager. If you don't have CocoaPods installed:
> 
> 1. Ensure you have Ruby installed (macOS comes with Ruby pre-installed)
> 2. Install CocoaPods by running: `sudo gem install cocoapods`
> 3. If you encounter Ruby version issues, consider using a Ruby version manager like [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/)
> 
> For more information, visit the [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html)

### 3. Configure the Application

Before running, you need to configure the example app:

1. Open the file `PulseInsight/example/App.tsx` 
2. Find and replace the placeholder values:
   ```javascript
   // Replace YOUR_ACCOUNT_ID with your actual account ID (e.g., 'PI-12345678')
   const pulseInsight = new PulseInsight({
     accountId: 'YOUR_ACCOUNT_ID',
     // ...
   });
   
   // Replace YOUR_HOST_URL with your actual host URL (e.g., 'survey.pulseinsights.com')
   pulseInsight.setHost('YOUR_HOST_URL');
   
   // Replace YOUR_VIEW_NAME with your actual view name for targeting surveys
   pulseInsight.setViewName('YOUR_VIEW_NAME');
   ```

### 4. Run the Application

```bash
# Make sure you're in the PulseInsight directory
cd PulseInsight  # If you're not already in this directory

# For iOS (macOS only)
npx react-native run-ios
# or
yarn ios

# For Android
npx react-native run-android
# or
yarn android
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
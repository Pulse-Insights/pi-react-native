# Pulse Insight React Native SDK

A React Native SDK for integrating PulseInsight surveys into your mobile applications.

## Installation

```bash
npm install pulse-insight-react-native --save
# or
yarn add pulse-insight-react-native
```

## Requirements

- React Native >= 0.70.0
- iOS 14.0+
- Android API level 21+
- Java 17 for Android development

## Development Requirements

### Java 17 Setup for Android Development

This project requires Java 17 for Android development. You can set up Java 17 in one of the following ways:

1. **Using jenv (recommended)**:
   ```bash
   # Install jenv if you haven't already
   brew install jenv
   
   # Add Java 17 to jenv
   jenv add /path/to/your/java17
   
   # Set Java 17 for this project only
   cd /path/to/project/root
   jenv local 17.0.11
   ```
   
   Note: The `.java-version` file is included in the repository, so if you have jenv installed, it will automatically switch to Java 17 when you enter the project directory.

2. **Setting JAVA_HOME environment variable before building**:
   ```bash
   export JAVA_HOME=/path/to/your/java17
   cd android
   ./gradlew build
   ```

3. **Adding Java path directly to gradle.properties**:
   If the above methods don't work for you, you can add the Java 17 path directly to `android/gradle.properties`:
   ```
   org.gradle.java.home=/path/to/your/java17
   ```

## Features

- Display PulseInsight surveys in your React Native application
- Support for both popup and inline survey formats
- Customizable survey appearance
- Comprehensive API for survey management
- Cross-platform support (iOS and Android)

## Usage

### Basic Setup

```javascript
import PulseInsight from 'pulse-insight-react-native';

// Initialize the SDK
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: __DEV__, // Optional: Enable debug mode in development
  previewMode: false, // Optional: Enable preview mode for testing
  customData: {
    // Optional: Add custom data for survey targeting
    userType: 'premium',
    appVersion: '1.0.0',
  },
});

// Initialize the SDK
await pulseInsight.initialize();

// Set the current view name (for targeting surveys)
pulseInsight.setViewName('HomeScreen');

// Serve surveys (check if any surveys should be displayed)
pulseInsight.serve();
```

### Inline Survey Component

```javascript
import { RCTInlineSurveyView } from 'pulse-insight-react-native';

function SurveyScreen() {
  return (
    <View style={styles.container}>
      <RCTInlineSurveyView
        identifier="YOUR_SURVEY_ID"
        style={{ height: 400, width: '100%' }}
        onFinish={(event) => {
          console.log('Survey completed:', event.nativeEvent.success);
        }}
        onContentLoaded={(event) => {
          console.log('Content height:', event.nativeEvent.height);
        }}
      />
    </View>
  );
}
```

### Advanced Usage

```javascript
// Set custom context data for survey targeting
pulseInsight.setContextData({
  userSegment: 'premium',
  region: 'US',
}, true); // true to merge with existing data

// Check if a specific survey has been answered
const hasAnswered = await pulseInsight.isSurveyAnswered('SURVEY_ID');

// Manually present a specific survey
pulseInsight.presentSurvey('SURVEY_ID');

// Enable or disable surveys
pulseInsight.enableSurveys(true);

// Set scan frequency (in seconds)
pulseInsight.setScanFrequency(30);
```

## API Reference

### PulseInsight Class

#### Constructor

```javascript
const pulseInsight = new PulseInsight(options);
```

**Options:**
- `accountId` (string, required): Your PulseInsight account ID
- `enableDebugMode` (boolean, optional): Enable debug logging
- `previewMode` (boolean, optional): Enable preview mode for testing
- `customData` (object, optional): Custom data for survey targeting

#### Methods

- `initialize()`: Initialize the SDK
- `setAccountID(accountId)`: Set or change the account ID
- `setViewName(viewName)`: Set the current view name
- `serve()`: Check and display eligible surveys
- `presentSurvey(surveyId)`: Manually display a specific survey
- `enableSurveys(enable)`: Enable or disable surveys
- `isSurveysEnabled()`: Check if surveys are enabled
- `setClientKey(clientKey)`: Set the client key
- `getClientKey()`: Get the current client key
- `setPreviewMode(enable)`: Enable or disable preview mode
- `isPreviewModeEnabled()`: Check if preview mode is enabled
- `isSurveyAnswered(surveyId)`: Check if a survey has been answered
- `setContextData(data, merge)`: Set context data for survey targeting
- `clearContextData()`: Clear all context data
- `setDeviceData(properties)`: Set device-specific data
- `setHost(hostName)`: Set the host name for the survey server
- `setDebugMode(enable)`: Enable or disable debug mode
- `resetUdid()`: Reset the unique device identifier
- `finishInlineMode()`: Manually finish inline survey mode

### RCTInlineSurveyView Component

```javascript
<RCTInlineSurveyView
  identifier="SURVEY_ID"
  style={styles.surveyContainer}
  onFinish={handleSurveyFinish}
  onContentLoaded={handleContentLoaded}
/>
```

**Props:**
- `identifier` (string, required): The survey ID to display
- `style` (object, optional): Style properties for the survey container
- `onFinish` (function, optional): Callback when survey is completed
- `onContentLoaded` (function, optional): Callback when survey content is loaded

## iOS Setup

The SDK uses CocoaPods for dependency management. Make sure your Podfile includes:

```ruby
pod 'pulse-insight-react-native', :path => '../node_modules/pulse-insight-react-native'
```

## Android Setup

Add the PulseInsights Maven repository to your project's build configuration:

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

## Example Project

For a complete example project, see the [example directory](https://github.com/Pulse-Insights/pi-react-native/tree/main/example) in the GitHub repository.

## License

MIT 
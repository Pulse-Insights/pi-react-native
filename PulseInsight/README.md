# PulseInsight React Native SDK Documentation

This document provides comprehensive documentation for the PulseInsight React Native SDK, including detailed API reference, platform-specific setup instructions, and advanced usage examples.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Platform Setup](#platform-setup)
  - [iOS Setup](#ios-setup)
  - [Android Setup](#android-setup)
- [API Reference](#api-reference)
  - [PulseInsight Class](#pulseinsight-class)
  - [RCTInlineSurveyView Component](#rctinlinesurveyview-component)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)

## Requirements

- React Native >= 0.70.0
- iOS 16.0+
- Android API level 21+
- Java 17 for Android development

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

## Installation

```bash
# npm
npm install pulse-insight-react-native --save

# yarn
yarn add pulse-insight-react-native
```

## Platform Setup

### iOS Setup

The SDK uses CocoaPods for dependency management:

1. Navigate to your iOS directory:
   ```bash
   cd ios
   ```

2. Install pods:
   ```bash
   pod install
   ```

If you encounter any issues:
- Make sure iOS deployment target is 16.0 or higher
- Verify Swift version is 5.0+
- Run `pod cache clean --all && pod install` if you encounter module issues
- Do NOT manually add PulseInsights as an SPM package in Xcode

### Android Setup

Android setup is automatically handled through auto-linking. You'll need to add the PulseInsights Maven repository to your project:

1. In your project's root `build.gradle` file (or `settings.gradle` for newer projects), add the PulseInsights Maven repository:

```gradle
// For build.gradle
allprojects {
    repositories {
        // ... other repositories
        maven {
            url "https://pi-sdk.s3.us-east-1.amazonaws.com/android"
        }
    }
}

// OR for settings.gradle (newer projects)
dependencyResolutionManagement {
    repositories {
        // ... other repositories
        maven {
            url "https://pi-sdk.s3.us-east-1.amazonaws.com/android"
        }
    }
}
```

#### Android Troubleshooting

1. **Maven Repository Issues**
   - Ensure auto-linking is enabled
   - Check that Android SDK is properly configured
   - If you see "Could not find com.pulseinsights:android-sdk", verify you've added the Maven repository

2. **Apache HTTP Legacy Library**
   If you encounter `java.lang.NoClassDefFoundError: Failed resolution of: Lorg/apache/http/HttpResponse`, add the Apache HTTP legacy library to your AndroidManifest.xml:

   ```xml
   <application
       ...
       >
       
       <!-- Required for Pulse Insights SDK on API level 28+ -->
       <uses-library
           android:name="org.apache.http.legacy"
           android:required="false" />
           
       <!-- Your activities and other components -->
       
   </application>
   ```

3. **JVM Target Version Inconsistency**
   If you see "Inconsistent JVM-target compatibility detected", ensure your app's Kotlin and Java compilation targets are consistent:

   ```gradle
   android {
       compileOptions {
           sourceCompatibility JavaVersion.VERSION_1_8  // Or VERSION_11, VERSION_17
           targetCompatibility JavaVersion.VERSION_1_8  // Must match sourceCompatibility
       }
       
       kotlinOptions {
           jvmTarget = "1.8"  // Must match Java version above
       }
   }
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

#### Core Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `initialize()` | Initialize the SDK | None | Promise<void> |
| `setAccountID(accountId)` | Set or change the account ID | accountId: string | void |
| `setViewName(viewName)` | **REQUIRED**: Set the current view name before calling serve() or presentSurvey() | viewName: string | void |
| `serve()` | Check and display eligible surveys (requires setViewName first) | None | Promise<boolean> |
| `presentSurvey(surveyId)` | Manually display a specific survey (requires setViewName first) | surveyId: string | Promise<boolean> |

> **⚠️ IMPORTANT**: You **MUST** call `setViewName()` before calling `serve()` or `presentSurvey()`. The view name is required for proper survey targeting and surveys will not display without it.

#### Configuration Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `enableSurveys(enable)` | Enable or disable surveys | enable: boolean | void |
| `isSurveysEnabled()` | Check if surveys are enabled | None | Promise<boolean> |
| `setClientKey(clientKey)` | Set the client key | clientKey: string | void |
| `getClientKey()` | Get the current client key | None | Promise<string> |
| `setPreviewMode(enable)` | Enable or disable preview mode | enable: boolean | void |
| `isPreviewModeEnabled()` | Check if preview mode is enabled | None | Promise<boolean> |
| `setDebugMode(enable)` | Enable or disable debug mode | enable: boolean | void |
| `setScanFrequency(seconds)` | Set scan frequency in seconds | seconds: number | void |

#### Data Management Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `isSurveyAnswered(surveyId)` | Check if a survey has been answered | surveyId: string | Promise<boolean> |
| `setContextData(data, merge)` | Set context data for survey targeting | data: object, merge: boolean | void |
| `clearContextData()` | Clear all context data | None | void |
| `setDeviceData(properties)` | Set device-specific data | properties: object | void |
| `resetUdid()` | Reset the unique device identifier | None | void |

#### Advanced Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `setHost(hostName)` | Set the host name for the survey server | hostName: string | void |
| `finishInlineMode()` | Manually finish inline survey mode | None | void |
| `isSurveyRenderingActive()` | Check if survey rendering is active | None | Promise<boolean> |
| `switchSurveyScan(enable)` | Switch survey scan on/off | enable: boolean | void |

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

## Advanced Usage

### Basic Setup

```javascript
import { PulseInsight } from 'pulse-insight-react-native';

// Initialize the SDK
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: __DEV__, // Enable debug mode in development
  previewMode: false, // Enable preview mode for testing
  customData: { 
    userType: 'premium',
    appVersion: '1.0.0'
  }
});

// Initialize the SDK (typically in componentDidMount or useEffect)
await pulseInsight.initialize();

// REQUIRED: You must set a view name before calling serve() or presentSurvey()
// Surveys will not display without a valid view name
pulseInsight.setViewName('HomeScreen');

// Serve surveys (check if any surveys should be displayed)
pulseInsight.serve();
```

### Inline Survey Component

```javascript
import { RCTInlineSurveyView } from 'pulse-insight-react-native';

function SurveyScreen() {
  const [contentHeight, setContentHeight] = useState(400);
  
  return (
    <View style={styles.container}>
      <RCTInlineSurveyView
        identifier="YOUR_SURVEY_ID"
        style={{ height: contentHeight, width: '100%' }}
        onFinish={(event) => {
          console.log('Survey completed:', event.nativeEvent.success);
        }}
        onContentLoaded={(event) => {
          setContentHeight(event.nativeEvent.height);
        }}
      />
    </View>
  );
}
```

### Advanced Context Data Management

```javascript
// Set custom context data for survey targeting
pulseInsight.setContextData({
  userSegment: 'premium',
  region: 'US',
  lastPurchaseDate: '2023-06-15',
  visitCount: 5
}, true); // true to merge with existing data

// Check if a specific survey has been answered
const hasAnswered = await pulseInsight.isSurveyAnswered('SURVEY_ID');

// Manually present a specific survey
pulseInsight.presentSurvey('SURVEY_ID');

// Reset device identifier (clears survey history)
pulseInsight.resetUdid();
```

## Expo Support

- **❌ Managed Workflow**: Not supported (requires development build)
- **✅ Development Build**: Supported
- **✅ Standard React Native**: Fully supported

## License

MIT 
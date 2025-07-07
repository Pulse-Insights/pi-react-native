# PulseInsight React Native Example App

This example application demonstrates how to integrate and use the PulseInsight React Native SDK in a real-world application.

## Features Demonstrated

- SDK initialization and configuration
- Survey triggering and display
- Context data management
- Inline survey implementation
- Event handling for survey completion

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn
- React Native development environment
- Xcode 14+ (for iOS)
- Android Studio (for Android)
- Java 17 (for Android)

### Configuration

Before running the example, you need to configure it with your PulseInsight account details:

1. Open `App.tsx`
2. Locate the SDK initialization code:
   ```javascript
   const pulseInsight = new PulseInsight({
     accountId: 'YOUR_ACCOUNT_ID',
     enableDebugMode: true
   });
   ```
3. Replace `'YOUR_ACCOUNT_ID'` with your actual PulseInsight account ID

### Running the Example

#### Step 1: Install Dependencies

```sh
# Install JavaScript dependencies
npm install
# or
yarn

# Install iOS dependencies
cd ios && bundle install && bundle exec pod install && cd ..
```

#### Step 2: Start Metro

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

#### Step 3: Run on Device/Simulator

**Android:**

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

**iOS:**

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Example App Structure

- `App.tsx` - Main application with SDK integration examples
- `ios/` - iOS native code and configuration
- `android/` - Android native code and configuration

## Key Implementation Points

### SDK Initialization

```javascript
// App.tsx
import { PulseInsight } from 'pulse-insight-react-native';

// Initialize the SDK
const pulseInsight = new PulseInsight({
  accountId: 'YOUR_ACCOUNT_ID',
  enableDebugMode: true
});

// Initialize the SDK
await pulseInsight.initialize();
```

### Setting View Name and Serving Surveys

```javascript
// CRITICAL: You MUST set a view name before calling serve() or presentSurvey()
// Surveys will not display without a valid view name
pulseInsight.setViewName('HomeScreen');

// Now that view name is set, you can check for and display eligible surveys
pulseInsight.serve();
```

### Using the Inline Survey Component

```javascript
import { RCTInlineSurveyView } from 'pulse-insight-react-native';

// In your component's render method
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
```

## Troubleshooting

If you encounter issues running the example:

- **iOS Build Errors**: Try cleaning the build folder in Xcode and running `pod install` again
- **Android Build Errors**: Verify Java 17 is properly configured
- **Survey Not Displaying**: Check if you've called `setViewName()` before `serve()` or `presentSurvey()`
- **Native Module Error**: Ensure you've run `pod install` for iOS or have the correct Maven repository for Android

For more detailed troubleshooting, refer to the [main SDK documentation](../../README.md).

## React Native Development Resources

- [React Native Website](https://reactnative.dev)
- [Getting Started Guide](https://reactnative.dev/docs/environment-setup)
- [Troubleshooting](https://reactnative.dev/docs/troubleshooting)

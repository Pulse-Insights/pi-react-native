# PulseInsight React Native SDK

React Native SDK for integrating PulseInsights surveys into mobile applications.

## Installation

### npm
```bash
npm install pulse-insight-react-native
```

### yarn
```bash
yarn add pulse-insight-react-native
```

## iOS Setup

### One-Step Installation
```bash
cd ios && pod install
```

That's it! The PulseInsightsSPM iOS SDK is now automatically included via CocoaPods.

## Usage

```javascript
import PulseInsights from 'pulse-insight-react-native';

// Initialize
PulseInsights.init('YOUR_API_KEY');

// Start survey
PulseInsights.startSurvey({
  surveyId: 'survey_123',
  userId: 'user_456'
});

// Inline survey
const InlineSurvey = () => {
  return (
    <PulseInsights.InlineSurveyView
      surveyId="survey_123"
      userId="user_456"
      onSurveyComplete={(result) => {
        console.log('Survey completed:', result);
      }}
    />
  );
};
```

## Android Setup

Android setup is automatically handled through auto-linking. Make sure you have the following in your `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.pulseinsights:surveysdk:latest_version'
}
```

## Expo Support

- **❌ Managed Workflow**: Not supported (requires development build)
- **✅ Development Build**: Supported
- **✅ Standard React Native**: Fully supported

## What's New in v0.1.14

✅ **Simplified iOS Setup**: No more manual SPM integration required!
✅ **Official CocoaPods**: Uses PulseInsightsSPM 1.0.11 from CocoaPods
✅ **One-Command Install**: Just `pod install` and you're ready to go

## Troubleshooting

### iOS

#### Build Issues
- Make sure iOS deployment target is 14.0 or higher
- Verify Swift version is 5.0+
- Run `pod install` again if you encounter module issues

### Android
- Ensure auto-linking is enabled
- Check that Android SDK is properly configured

## Migration from v0.1.12 and earlier

If you're upgrading from an earlier version that required manual SPM setup:

1. Remove any manual SPM package references from Xcode
2. Remove any custom Podfile configurations related to PulseInsights
3. Run `pod install`
4. Clean and rebuild your project

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.
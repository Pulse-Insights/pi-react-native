# PulseInsight React Native SDK - Technical Reference

This document provides technical implementation details for developers who want to understand or contribute to the PulseInsight React Native SDK.

> **Note:** For general usage and integration documentation, please refer to the [main SDK documentation](../README.md).

## SDK Architecture

The PulseInsight React Native SDK follows a bridge architecture pattern that connects React Native JavaScript code with native implementations on iOS and Android.

```
JavaScript Layer (React Native)
         ↓
   Native Module Bridge
         ↓
 ┌─────────┴─────────┐
 ↓                   ↓
iOS Native      Android Native
(Swift)          (Kotlin)
```

## Directory Structure

- `index.ts` - Main SDK implementation and API exports
- `/components` - React Native components (e.g., RCTInlineSurveyView)

## Core Implementation Details

### Native Module Registration

The SDK registers native modules for both iOS and Android:

- iOS: `RCTPulseInsightModule` in Swift with Objective-C bridging
- Android: `RCTPulseInsightModule` and `RCTPulseInsightPackage` in Kotlin

### Component Registration

The inline survey component is registered as a native UI component:

- iOS: `RCTInlineSurveyViewManager` (Swift)
- Android: `RCTInlineSurveyViewManager` (Kotlin)

## Important Implementation Requirements

When making changes to the SDK, ensure:

1. **Initialization Flow**: The SDK requires proper initialization before any survey operations
2. **Event Handling**: Native events must be properly mapped to JavaScript callbacks
3. **Error Handling**: All native method calls should include proper error handling
4. **Memory Management**: Survey views should be properly cleaned up when no longer needed

## Native Dependencies

- **iOS**: PulseInsightsSPM (Swift Package Manager)
- **Android**: com.pulseinsights:android-sdk

## Development Workflow

1. Make changes to the SDK code
2. Test changes using the example app
3. Update documentation if API changes are made
4. Submit pull request with comprehensive testing

## Build and Publish Process

To build and publish the SDK:

1. Update version in package.json
2. Run build process: `npm run build`
3. Test the build with the example app
4. Publish to npm: `npm publish`

## License

MIT 
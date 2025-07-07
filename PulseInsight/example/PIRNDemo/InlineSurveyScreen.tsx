import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import PulseInsight, { RCTInlineSurveyView } from 'pulse-insight-react-native';

interface InlineSurveyScreenProps {
  sdk: PulseInsight | null;
  sdkInitialized: boolean;
  onBack: () => void;
}

const InlineSurveyScreen: React.FC<InlineSurveyScreenProps> = ({
  sdk,
  sdkInitialized,
  onBack,
}) => {
  const surveyViewName = 'YOUR_INLINE_VIEW_NAME';
  const inlineTargetId = 'YOUR_INLINE_TARGET_ID';
  const [displaySurvey, setDisplaySurvey] = useState(false);

  const setViewNameSilently = useCallback(async () => {
    if (!sdk || !sdkInitialized) {return;}

    try {
      await sdk.setViewName(surveyViewName);
      console.log(`View name set to: ${surveyViewName}`);
    } catch (error) {
      console.error('Failed to set view name:', error);
    }
  }, [sdk, sdkInitialized]);

  useEffect(() => {
    if (sdk && sdkInitialized) {
      setViewNameSilently();
    }
  }, [sdk, sdkInitialized, setViewNameSilently]);

  const triggerServe = useCallback(async () => {
    if (!sdk || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    try {
      await sdk.serve();
      console.log('Serve triggered');
      setDisplaySurvey(true);
    } catch (error) {
      console.error('Failed to trigger serve:', error);
      Alert.alert('Error', 'Failed to trigger serve');
    }
  }, [sdk, sdkInitialized]);

  const handleSurveyFinish = useCallback(() => {
    console.log('Survey completed or closed, hiding the survey view');
    setDisplaySurvey(false);
  }, []);

  const handleContentLoaded = useCallback((event: any) => {
    const { height, loaded } = event.nativeEvent;
    console.log(`Survey content loaded - Height: ${height}px, Loaded: ${loaded}`);
    // setDisplaySurvey(true);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Inline Survey Example</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={false}
        removeClippedSubviews={Platform.OS === 'android'}
        scrollEventThrottle={16}
      >
        <Text style={styles.paragraph}>
          This is an example page showing how inline surveys can be integrated into your app.
          Inline surveys allow you to collect feedback directly within your app's flow
          without disrupting the user experience with modal pop-ups.
        </Text>

        <Text style={styles.paragraph}>
          This page is using a preconfigured inline survey with:
          {'\n'}• View name: <Text style={styles.highlight}>{surveyViewName}</Text>
          {'\n'}• Inline target ID: <Text style={styles.highlight}>{inlineTargetId}</Text>
        </Text>

        {/* Serve Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, !displaySurvey ? styles.activeButton : styles.disabledButton]}
            onPress={triggerServe}
            disabled={displaySurvey}
          >
            <Text style={styles.buttonText}>Show Inline Survey</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.paragraph}>
          After clicking the button above, a survey will appear below if one is available for this view.
          The survey will be embedded naturally into the content flow, providing a seamless experience.
        </Text>

        {displaySurvey && (
          <RCTInlineSurveyView
            identifier={inlineTargetId}
            style={styles.surveyComponent}
            onFinish={handleSurveyFinish}
            onContentLoaded={handleContentLoaded}
          />
        )}

        <Text style={styles.paragraph}>
          Inline surveys can be strategically placed throughout your app to gather
          contextual feedback at key moments in the user journey. This approach typically
          results in higher response rates and more valuable insights compared to
          traditional pop-up surveys.
        </Text>

        <Text style={styles.paragraph}>
          For developers: This example demonstrates the recommended component-based approach
          using the {'<RCTInlineSurveyView>'} component. The survey is configured with
          the identifier "{inlineTargetId}" and will display when conditions are met.
        </Text>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  actionContainer: {
    marginVertical: 20,
  },
  actionButton: {
    padding: 14,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#2ecc71',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  surveyComponent: {
    width: '100%',
    height: 800,
    marginVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  bottomPadding: {
    height: 40,
  },
});

export default InlineSurveyScreen;

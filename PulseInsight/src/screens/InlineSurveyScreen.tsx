import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import PulseInsight from '../sdk';

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
  const [surveyViewName, setSurveyViewName] = useState('');

  const setSurveyContainerViewName = async () => {
    if (!surveyViewName.trim()) {
      Alert.alert('Error', 'Please enter a view name');
      return;
    }

    if (!sdk || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    try {
      await sdk.setViewName(surveyViewName);
      Alert.alert('Success', `View name set to: ${surveyViewName}`);
    } catch (error) {
      console.error('Failed to set view name:', error);
      Alert.alert('Error', 'Failed to set view name');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Inline Survey Example</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.paragraph}>
          This is an example page showing how inline surveys can be integrated into your app.
          The survey will appear in the designated container below when available.
        </Text>

        <Text style={styles.paragraph}>
          Inline surveys allow you to collect feedback directly within your app's flow
          without disrupting the user experience with modal pop-ups.
        </Text>

        <View style={styles.viewNameContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter View Name for Survey"
            value={surveyViewName}
            onChangeText={setSurveyViewName}
          />
          <TouchableOpacity style={styles.button} onPress={setSurveyContainerViewName}>
            <Text style={styles.buttonText}>Set View Name</Text>
          </TouchableOpacity>
        </View>

        {/* Container for inline survey */}
        <View style={styles.surveyContainer}>
          <Text style={styles.surveyPlaceholder}>
            {surveyViewName ?
              `Survey container with view name: ${surveyViewName}` :
              'Set a view name above to associate this container with surveys'
            }
          </Text>
        </View>

        <Text style={styles.paragraph}>
          After setting the view name, any surveys configured for this view in your
          PulseInsight dashboard will appear in the container above when conditions are met.
        </Text>

        <Text style={styles.paragraph}>
          You can style and position the survey container to fit naturally within your app's
          design, providing a seamless survey experience.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  scrollContent: {
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  viewNameContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  surveyContainer: {
    minHeight: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyPlaceholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default InlineSurveyScreen;

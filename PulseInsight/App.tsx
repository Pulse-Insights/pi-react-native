/**
 * PulseInsight React Native SDK Example app
 */

import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import PulseInsight from './src/sdk';

function App(): React.JSX.Element {
  const [sdkInitialized, setSdkInitialized] = useState(false);

  const pulseInsight = useMemo(() => new PulseInsight({apiKey: 'demo-api-key'}), []);

  useEffect(() => {
    async function initSDK() {
      try {
        const success = await pulseInsight.initialize();
        setSdkInitialized(success);

        if (success) {
          console.log('SDK initialized successfully');
        } else {
          console.warn('SDK initialization failed');
        }
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    }

    initSDK();
  }, [pulseInsight]);

  const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
    try {
      await pulseInsight.trackEvent(eventName, properties);
      Alert.alert('Event log', `succeed: ${eventName}`);
    } catch (error) {
      console.error('Failed to track event:', error);
      Alert.alert('Event log', 'Error: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>PulseInsight SDK Demo</Text>
          <Text style={styles.subtitle}>
            SDK Status: {sdkInitialized ? 'Initialized ✅' : 'Not Initialized ❌'}
          </Text>
        </View>

        <View style={styles.eventSection}>
          <Text style={styles.sectionTitle}>Track Events</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => trackEvent('button_click', {buttonId: 'demo_button'})}>
            <Text style={styles.buttonText}>Track Button Click</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => trackEvent('page_view', {pageName: 'Home'})}>
            <Text style={styles.buttonText}>Track Page View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => trackEvent('custom_event', {
              timestamp: new Date().toISOString(),
              value: Math.random() * 100,
            })}>
            <Text style={styles.buttonText}>Track Custom Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  eventSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default App;

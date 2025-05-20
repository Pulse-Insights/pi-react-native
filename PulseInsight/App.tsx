/**
 * PulseInsight React Native SDK Example app
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from 'react-native';

import PulseInsight from './src/sdk';
import InlineSurveyScreen from './src/screens/InlineSurveyScreen';

function App(): React.JSX.Element {
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [accountId, setAccountId] = useState('PI-71294199');
  const [viewName, setViewName] = useState('mainActivity');
  const [clientKey, setClientKey] = useState('');
  const [surveyId, setSurveyId] = useState('');
  const [presentSurveyId, setPresentSurveyId] = useState('');
  const [showInlineSurvey, setShowInlineSurvey] = useState(false);
  const [showContextData, setShowContextData] = useState(false);
  const [contextKey, setContextKey] = useState('');
  const [contextValue, setContextValue] = useState('');
  const [contextPairs, setContextPairs] = useState<{key: string, value: string}[]>([]);
  const [scanFrequency, setScanFrequency] = useState('10');
  const [isScanEnabled, setIsScanEnabled] = useState(false);

  // Using useRef to store the SDK instance to ensure it doesn't get lost between renders
  const pulseInsightRef = useRef<PulseInsight | null>(null);

  // Initialize SDK
  useEffect(() => {
    async function initSDK() {
      if (pulseInsightRef.current) {
        console.log('SDK already initialized, skipping initialization');
        return;
      }

      try {
        // Create a new SDK instance
        const sdk = new PulseInsight({
          accountId: accountId,
          enableDebugMode: true,
          customData: {'name': 'test_ios_rn', 'type': 'worker', 'age': '52'},
        });

        // Initialize the SDK
        const success = await sdk.initialize();

        // Save SDK instance to ref
        pulseInsightRef.current = sdk;
        setSdkInitialized(success);

        if (success) {
          pulseInsightRef.current?.setHost('survey.pulseinsights.com');
          pulseInsightRef.current?.setViewName('mainActivity');
          console.log('SDK initialized successfully');
        } else {
          console.warn('SDK initialization failed');
        }
      } catch (error) {
        console.error('Error initializing SDK:', error);
        setSdkInitialized(false);
      }
    }

    initSDK();
  }, [accountId]); // Only re-initialize when accountId changes

  const saveAccountId = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    pulseInsightRef.current.setAccountID(accountId)
      .then(() => {
        console.log('Account ID set successfully');
        Alert.alert('Success', `Account ID set to: ${accountId}`);
      })
      .catch(err => {
        console.error('Failed to set account ID:', err);
        Alert.alert('Error', 'Failed to set Account ID');
      });
  };

  const saveViewName = () => {
    if (!viewName.trim()) {
      Alert.alert('Error', 'Please enter View Name');
      return;
    }

    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // Call setViewName method
    pulseInsightRef.current.setViewName(viewName)
      .then(() => {
        console.log('View name set successfully');
        Alert.alert('Success', `View Name set to: ${viewName}`);
      })
      .catch(err => {
        console.error('Failed to set view name:', err);
        Alert.alert('Error', 'Failed to set View Name');
      });
  };

  const saveClientKey = () => {
    if (!clientKey.trim()) {
      Alert.alert('Error', 'Please enter Client Key');
      return;
    }

    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // Call setClientKey method
    pulseInsightRef.current.setClientKey(clientKey)
      .then(() => {
        console.log('Client key set successfully');
        Alert.alert('Success', `Client Key set to: ${clientKey}`);
      })
      .catch(err => {
        console.error('Failed to set client key:', err);
        Alert.alert('Error', 'Failed to set Client Key');
      });
  };

  const checkSurveyAnswered = () => {
    if (!surveyId.trim()) {
      Alert.alert('Error', 'Please enter Survey ID');
      return;
    }

    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // Call checkSurveyAnswered method
    pulseInsightRef.current.isSurveyAnswered(surveyId)
      .then((answered) => {
        console.log('Survey answered status:', answered);
        Alert.alert('Survey Status', answered ? 'Survey has been answered' : 'Survey has not been answered');
      })
      .catch(err => {
        console.error('Failed to check survey answered status:', err);
        Alert.alert('Error', 'Failed to check survey status');
      });
  };

  const resetDeviceId = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // Call resetUdid method
    pulseInsightRef.current.resetUdid()
      .then(() => {
        console.log('Device ID reset successfully');
        Alert.alert('Success', 'Device ID has been reset');
      })
      .catch(err => {
        console.error('Failed to reset device ID:', err);
        Alert.alert('Error', 'Failed to reset device ID');
      });
  };

  const handleServe = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // Call serve method
    pulseInsightRef.current.serve()
      .then(() => {})
      .catch(err => {
        console.error('Error calling serve:', err);
        Alert.alert('Error', 'Failed to call serve method');
      });
  };

  const handlePresent = () => {
    if (!presentSurveyId.trim()) {
      Alert.alert('Error', 'Please enter Survey ID to present');
      return;
    }

    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    // need to make sure view name is set
    if (!viewName.trim()) {
      Alert.alert('Error', 'Please enter View Name');
      return;
    }

    // Call presentSurvey method
    pulseInsightRef.current.presentSurvey(presentSurveyId)
      .then(() => {
        console.log('Survey presented successfully');
      })
      .catch(err => {
        console.error('Error presenting survey:', err);
        Alert.alert('Error', 'Failed to present survey');
      });
  };

  const addContextPair = () => {
    if (!contextKey.trim()) {
      Alert.alert('Error', 'Please enter a context key');
      return;
    }

    // Add new key-value pair to the list
    setContextPairs([...contextPairs, { key: contextKey, value: contextValue }]);

    // Clear input fields for next entry
    setContextKey('');
    setContextValue('');
  };

  const removeContextPair = (index: number) => {
    const newPairs = [...contextPairs];
    newPairs.splice(index, 1);
    setContextPairs(newPairs);
  };

  const handleSetContextData = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    if (contextPairs.length === 0) {
      Alert.alert('Error', 'Please add at least one context key-value pair');
      return;
    }

    // Convert array of pairs to a single object
    const contextData = contextPairs.reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);

    pulseInsightRef.current.setContextData(contextData)
      .then(() => {
        console.log('Context data set successfully', contextData);
        Alert.alert('Success', 'Context data set successfully');
      })
      .catch(err => {
        console.error('Failed to set context data:', err);
        Alert.alert('Error', 'Failed to set context data');
      });
  };

  const handleClearContextData = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    pulseInsightRef.current.clearContextData()
      .then(() => {
        console.log('Context data cleared successfully');
        Alert.alert('Success', 'Context data cleared');
        setContextPairs([]);
        setContextKey('');
        setContextValue('');
      })
      .catch(err => {
        console.error('Failed to clear context data:', err);
        Alert.alert('Error', 'Failed to clear context data');
      });
  };

  const handleSetScanFrequency = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    const frequency = parseInt(scanFrequency, 10);
    if (isNaN(frequency) || frequency <= 0) {
      Alert.alert('Error', 'Please enter a valid positive number');
      return;
    }

    const sdk = pulseInsightRef.current;

    sdk.enableSurveys(true)
      .then(() => {
        setIsScanEnabled(true);
        console.log('Scan enabled successfully');

        return sdk.setScanFrequency(frequency);
      })
      .then(() => {
        console.log('Scan frequency set successfully:', frequency);
        Alert.alert('Success', `Scan frequency set to ${frequency} seconds`);

        return sdk.isSurveysEnabled();
      })
      .then((isEnabled) => {
        console.log('Scan is currently:', isEnabled ? 'enabled' : 'disabled');
        if (!isEnabled) {
          Alert.alert('Warning', 'Scan is still disabled despite our attempt to enable it');
        }
      })
      .catch(err => {
        console.error('Failed in scan setup:', err);
        Alert.alert('Error', 'Failed to set up scanning');
      });
  };

  const handleToggleScan = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    const newScanState = !isScanEnabled;

    pulseInsightRef.current.enableSurveys(newScanState)
      .then(() => {
        setIsScanEnabled(newScanState);
        console.log(`Scan ${newScanState ? 'enabled' : 'disabled'} successfully`);
        Alert.alert('Success', `Survey scan ${newScanState ? 'enabled' : 'disabled'}`);
      })
      .catch(err => {
        console.error(`Failed to ${newScanState ? 'enable' : 'disable'} scan:`, err);
        Alert.alert('Error', `Failed to ${newScanState ? 'enable' : 'disable'} scan`);
      });
  };

  const checkScanStatus = () => {
    if (!pulseInsightRef.current || !sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    pulseInsightRef.current.isSurveysEnabled()
      .then((enabled) => {
        setIsScanEnabled(enabled);
        console.log('Scan status:', enabled);
        Alert.alert('Scan Status', `Survey scan is currently ${enabled ? 'enabled' : 'disabled'}`);
      })
      .catch(err => {
        console.error('Failed to check scan status:', err);
        Alert.alert('Error', 'Failed to check scan status');
      });
  };

  if (showInlineSurvey) {
    return (
      <InlineSurveyScreen
        sdk={pulseInsightRef.current}
        sdkInitialized={sdkInitialized}
        onBack={() => setShowInlineSurvey(false)}
      />
    );
  }

  const renderContextItem = ({ item, index }: { item: { key: string, value: string }, index: number }) => (
    <View style={styles.contextItem}>
      <View style={styles.contextItemText}>
        <Text style={styles.contextItemKey}>{item.key}: </Text>
        <Text style={styles.contextItemValue}>{item.value}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeContextPair(index)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>PulseInsight SDK Demo</Text>
          <Text style={styles.subtitle}>
            SDK Status: {sdkInitialized ? 'Initialized ✅' : 'Not Initialized ❌'}
          </Text>
          <Text style={styles.subtitle}>
            Account ID: {accountId}
          </Text>
        </View>

        {/* Configuration Section */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Configuration</Text>

          {/* Account ID Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Account ID"
              value={accountId}
              onChangeText={setAccountId}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveAccountId}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* View Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter View Name"
              value={viewName}
              onChangeText={setViewName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveViewName}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Client Key Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Client Key"
              value={clientKey}
              onChangeText={setClientKey}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveClientKey}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Survey ID Input for checkIfAnswered */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Survey ID to check"
              value={surveyId}
              onChangeText={setSurveyId}
            />
            <TouchableOpacity style={styles.saveButton} onPress={checkSurveyAnswered}>
              <Text style={styles.saveButtonText}>Check if answered</Text>
            </TouchableOpacity>
          </View>

          {/* Survey ID Input for presenting */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Survey ID to present"
              value={presentSurveyId}
              onChangeText={setPresentSurveyId}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handlePresent}>
              <Text style={styles.saveButtonText}>Present</Text>
            </TouchableOpacity>
          </View>

          {/* Serve Button */}
          <TouchableOpacity
            style={[styles.button, !sdkInitialized && styles.disabledButton]}
            onPress={handleServe}
            disabled={!sdkInitialized}
          >
            <Text style={styles.buttonText}>Show Survey</Text>
          </TouchableOpacity>

          {/* Reset UDID Button */}
          <TouchableOpacity
            style={[styles.button, !sdkInitialized && styles.disabledButton]}
            onPress={resetDeviceId}
            disabled={!sdkInitialized}
          >
            <Text style={styles.buttonText}>Reset Device ID</Text>
          </TouchableOpacity>

          {/* Inline Survey Button */}
          <TouchableOpacity
            style={[styles.button, styles.inlineSurveyButton, !sdkInitialized && styles.disabledButton]}
            onPress={() => setShowInlineSurvey(true)}
            disabled={!sdkInitialized}
          >
            <Text style={styles.buttonText}>Inline Survey</Text>
          </TouchableOpacity>
        </View>

        {/* Context Data Section */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Context Data</Text>

          <TouchableOpacity
            style={[styles.button, styles.contextDataButton]}
            onPress={() => setShowContextData(!showContextData)}
          >
            <Text style={styles.buttonText}>
              {showContextData ? 'Hide Context Data Form' : 'Show Context Data Form'}
            </Text>
          </TouchableOpacity>

          {showContextData && (
            <View style={styles.contextDataContainer}>
              {/* Input for new key-value pair */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Context Key"
                  value={contextKey}
                  onChangeText={setContextKey}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Context Value"
                  value={contextValue}
                  onChangeText={setContextValue}
                />
              </View>

              {/* Add button for this pair */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={addContextPair}
              >
                <Text style={styles.buttonText}>Add Key-Value Pair</Text>
              </TouchableOpacity>

              {/* Display current context pairs */}
              {contextPairs.length > 0 && (
                <View style={styles.contextPairsContainer}>
                  <Text style={styles.contextPairsTitle}>Current Context Pairs:</Text>
                  <FlatList
                    data={contextPairs}
                    renderItem={renderContextItem}
                    keyExtractor={(item, index) => `context-${index}`}
                    scrollEnabled={false}
                  />
                </View>
              )}

              {/* Save/Clear buttons */}
              <View style={styles.contextButtonsContainer}>
                <TouchableOpacity
                  style={[styles.contextButton, styles.saveContextButton, !sdkInitialized && styles.disabledButton]}
                  onPress={handleSetContextData}
                  disabled={!sdkInitialized || contextPairs.length === 0}
                >
                  <Text style={styles.buttonText}>Save All Context</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.contextButton, styles.clearContextButton, !sdkInitialized && styles.disabledButton]}
                  onPress={handleClearContextData}
                  disabled={!sdkInitialized}
                >
                  <Text style={styles.buttonText}>Clear All Context</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Scan Control Section */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Scan Control</Text>

          {/* Scan Frequency Setting */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Scan Frequency (seconds)"
              value={scanFrequency}
              onChangeText={setScanFrequency}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSetScanFrequency}
              disabled={!sdkInitialized}
            >
              <Text style={styles.saveButtonText}>Set</Text>
            </TouchableOpacity>
          </View>

          {/* Scan Control Buttons */}
          <View style={styles.scanButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.scanButton,
                isScanEnabled ? styles.disableScanButton : styles.enableScanButton,
                !sdkInitialized && styles.disabledButton,
              ]}
              onPress={handleToggleScan}
              disabled={!sdkInitialized}
            >
              <Text style={styles.buttonText}>
                {isScanEnabled ? 'Disable Scan' : 'Enable Scan'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.scanButton, styles.checkStatusButton, !sdkInitialized && styles.disabledButton]}
              onPress={checkScanStatus}
              disabled={!sdkInitialized}
            >
              <Text style={styles.buttonText}>Check Scan Status</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 4,
  },
  configSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b3d1e6',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inlineSurveyButton: {
    backgroundColor: '#9b59b6',
  },
  contextDataButton: {
    backgroundColor: '#e67e22',
  },
  contextDataContainer: {
    marginTop: 10,
  },
  contextButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  contextButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveContextButton: {
    backgroundColor: '#2ecc71',
    marginRight: 5,
  },
  clearContextButton: {
    backgroundColor: '#e74c3c',
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  contextPairsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  contextPairsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  contextItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  contextItemText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contextItemKey: {
    fontWeight: '600',
    color: '#444',
  },
  contextItemValue: {
    color: '#666',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scanButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scanButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  enableScanButton: {
    backgroundColor: '#2ecc71',
    marginRight: 5,
  },
  disableScanButton: {
    backgroundColor: '#e74c3c',
    marginRight: 5,
  },
  checkStatusButton: {
    backgroundColor: '#f39c12',
    marginLeft: 5,
  },
});

export default App;

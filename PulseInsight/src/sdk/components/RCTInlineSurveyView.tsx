import React from 'react';
import { ViewStyle, requireNativeComponent, NativeSyntheticEvent } from 'react-native';

interface RCTInlineSurveyViewProps {
  identifier: string;
  style?: ViewStyle;
  onFinish?: (event: NativeSyntheticEvent<{ success: boolean }>) => void;
  onContentLoaded?: (event: NativeSyntheticEvent<{ height: number; loaded: boolean }>) => void;
}

/**
 * RCTInlineSurveyView Component
 *
 * A React Native component that displays inline surveys from PulseInsight.
 * This component is part of the PulseInsight SDK.
 *
 * @example
 * ```jsx
 * import { RCTInlineSurveyView } from 'pulse-insight-react-native';
 *
 * <RCTInlineSurveyView
 *   identifier="survey123"
 *   style={{height: 200, width: '100%'}}
 *   onFinish={() => console.log('Survey completed')}
 * />
 * ```
 */

const NativeInlineSurveyView = requireNativeComponent<RCTInlineSurveyViewProps>('RCTInlineSurveyView');

const RCTInlineSurveyView: React.FC<RCTInlineSurveyViewProps> = (props) => {
  return <NativeInlineSurveyView {...props} />;
};

export default RCTInlineSurveyView;

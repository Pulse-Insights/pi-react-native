import React from 'react';
import { ViewStyle, requireNativeComponent } from 'react-native';

interface RCTInlineSurveyViewProps {
  identifier: string;
  style?: ViewStyle;
}

/**
 * RCTInlineSurveyView Component
 *
 * A React Native component that displays inline surveys from PulseInsight.
 *
 * @example
 * ```jsx
 * <RCTInlineSurveyView
 *   identifier="survey123"
 *   style={{height: 200, width: '100%'}}
 * />
 * ```
 */

const NativeInlineSurveyView = requireNativeComponent('RCTInlineSurveyView');

const RCTInlineSurveyView: React.FC<RCTInlineSurveyViewProps> = (props) => {
  return <NativeInlineSurveyView {...props} />;
};

export default RCTInlineSurveyView;

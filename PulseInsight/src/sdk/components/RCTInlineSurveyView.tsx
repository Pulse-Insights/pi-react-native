import React from 'react';
import { ViewStyle, requireNativeComponent, NativeSyntheticEvent } from 'react-native';

interface RCTInlineSurveyViewProps {
  identifier: string;
  style?: ViewStyle;
  onFinish?: (event: NativeSyntheticEvent<{ success: boolean }>) => void;
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

// 使用requireNativeComponent直接引用原生组件
// 注意：这个名称必须与原生视图管理器类的名称匹配（不包含"Manager"后缀）
const NativeInlineSurveyView = requireNativeComponent<RCTInlineSurveyViewProps>('RCTInlineSurveyView');

const RCTInlineSurveyView: React.FC<RCTInlineSurveyViewProps> = (props) => {
  return <NativeInlineSurveyView {...props} />;
};

export default RCTInlineSurveyView;

import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface RCTInlineSurveyViewProps extends ViewProps {
  /**
   * The unique identifier for the survey to display
   */
  identifier: string;
}

export default codegenNativeComponent<RCTInlineSurveyViewProps>(
  'RCTInlineSurveyViewProps'
);

//
//  RCTInlineSurveyViewManager.m
//  PulseInsight
//
//  Created by shenlongshenlongshenlong on 2025/5/20.
//

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RCTInlineSurveyViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSString)
RCT_EXPORT_VIEW_PROPERTY(onFinish, RCTDirectEventBlock)
@end

//
//  RCTPulseInsight.m
//  PulseInsight
//
//  Created by shenlongshenlongshenlong on 2025/5/19.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RCTPulseInsight, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)config)
RCT_EXTERN_METHOD(setAccountID:(NSString *)accountID)
RCT_EXTERN_METHOD(setViewName:(NSString *)viewName)
RCT_EXTERN_METHOD(setScanFrequency:(nonnull NSNumber *)frequencyInSeconds)
RCT_EXTERN_METHOD(serve)
RCT_EXTERN_METHOD(present:(NSString *)surveyId)
RCT_EXTERN_METHOD(switchSurveyScan:(BOOL)enable)
RCT_EXTERN_METHOD(isSurveyScanWorking:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setClientKey:(NSString *)clientId)
RCT_EXTERN_METHOD(getClientKey:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setPreviewMode:(BOOL)enable)
RCT_EXTERN_METHOD(isPreviewModeOn:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(checkSurveyAnswered:(NSString *)surveyId resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setContextData:(NSDictionary *)data merge:(BOOL)merge)
RCT_EXTERN_METHOD(clearContextData)
RCT_EXTERN_METHOD(setDeviceData:(NSDictionary *)data)
RCT_EXTERN_METHOD(setHost:(NSString *)hostName)
RCT_EXTERN_METHOD(setDebugMode:(BOOL)enable)
RCT_EXTERN_METHOD(resetUdid)
RCT_EXTERN_METHOD(finishInlineMode)

@end

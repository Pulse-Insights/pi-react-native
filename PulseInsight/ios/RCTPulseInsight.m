//
//  RCTPulseInsight.m
//  PulseInsight
//
//  Created by shenlongshenlongshenlong on 2025/5/19.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RCTPulseInsight, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)config)
RCT_EXTERN_METHOD(trackEvent:(NSString *)eventName properties:(NSDictionary *)properties)

@end

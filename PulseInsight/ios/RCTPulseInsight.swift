//
//  RCTPulseInsight.swift
//  PulseInsight
//
//  Created by shenlongshenlongshenlong on 2025/5/19.
//

import Foundation
import PulseInsights
import React

@objc(RCTPulseInsight)
class RCTPulseInsight: NSObject {
  
  static func moduleName() -> String! { "PulseInsight" }
  static func requiresMainQueueSetup() -> Bool { true }

  @objc
  func initialize(_ config: [String: Any]) {
    guard let appId = config["appId"] as? String else {
      return
    }
    if let userId = config["userId"] as? String {
      PulseInsights.init(userId)
    }
  }
  
  @objc
  func trackEvent(_ eventName: String, properties: [String: Any]?) {
//    PulseInsights.trackEvent(eventName, properties: properties)
  }
  
}

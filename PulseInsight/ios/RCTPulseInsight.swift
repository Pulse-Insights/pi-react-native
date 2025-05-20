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
  
  static func moduleName() -> String! { "RCTPulseInsight" }
  static func requiresMainQueueSetup() -> Bool { true }

  @objc
  func initialize(_ config: [String: Any]) {
    guard let accountId = config["accountId"] as? String else {
        return
    }
    let enableDebugMode = config["enableDebugMode"] as? Bool ?? false
    let previewMode = config["previewMode"] as? Bool ?? false
    let customData = config["customData"] as? [String: String] ?? [:]
    
    let pi = PulseInsights(accountId, enableDebugMode: enableDebugMode, previewMode: previewMode, customData: customData)
  }
  
  @objc
  func setAccountID(_ accountID: String) {
    PulseInsights.getInstance.configAccountID(accountID)
  }

  @objc
  func setViewName(_ viewName: String) {
    DispatchQueue.main.async {
      if let viewController = self.currentViewControllerFromBridge() {
          PulseInsights.getInstance.setViewName(viewName, controller: viewController)
      }
    }
  }
  
  private func currentViewControllerFromBridge() -> UIViewController? {
      if let window = UIApplication.shared.delegate?.window,
         let rootViewController = window?.rootViewController {
          var topController = rootViewController
          while let presentedVC = topController.presentedViewController {
              topController = presentedVC
          }
          return topController
      }
      return nil
  }
  
  @objc
  func setScanFrequency(_ frequencyInSeconds: NSNumber) {
    DispatchQueue.main.async {
      print("RCTPulseInsight: Setting scan frequency to \(frequencyInSeconds) seconds")
      
      guard PulseInsights.getInstance != nil else {
        print("RCTPulseInsight: Cannot set scan frequency - SDK not initialized")
        return
      }
      
      PulseInsights.getInstance.setScanFrequency(frequencyInSeconds.intValue)
      
      print("RCTPulseInsight: Scan timer setup completed")
    }
  }
  
  @objc
  func serve() {
    PulseInsights.getInstance.serve()
  }
  
  @objc
  func present(_ surveyId: String) {
    PulseInsights.getInstance.present(surveyId)
  }
  
  @objc
  func createInlineSurvey(_ identifier: String) {
    let inlineSurveyView = InlineSurveyView(identifier: identifier)
    // TODO
  }
  
  @objc
  func switchSurveyScan(_ enable: Bool) {
    PulseInsights.getInstance.switchSurveyScan(enable)
  }
  
  @objc
  func isSurveyScanWorking(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(PulseInsights.getInstance.isSurveyScanWorking())
  }
  
  @objc
  func setClientKey(_ clientId: String) {
    PulseInsights.getInstance.setClientKey(clientId)
  }
  
  @objc
  func getClientKey(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(PulseInsights.getInstance.getClientKey())
  }
  
  @objc
  func setPreviewMode(_ enable: Bool) {
    PulseInsights.getInstance.setPreviewMode(enable)
  }
  
  @objc
  func isPreviewModeOn(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(PulseInsights.getInstance.isPreviewModeOn())
  }
  
  @objc
  func checkSurveyAnswered(_ surveyId: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(PulseInsights.getInstance.checkSurveyAnswered(surveyId))
  }
  
  @objc
  func setContextData(_ data: [String: String]) {
    PulseInsights.getInstance.setContextData(data)
  }
  
  @objc
  func clearContextData() {
    PulseInsights.getInstance.clearContextData()
  }
  
  @objc
  func setDeviceData(_ data: [String: String]) {
    PulseInsights.getInstance.setDeviceData(data)
  }
  
  @objc
  func setHost(_ hostName: String) {
    PulseInsights.getInstance.setHost(hostName)
  }
  
  @objc
  func setDebugMode(_ enable: Bool) {
    PulseInsights.getInstance.setDebugMode(enable)
  }
  
  @objc
  func resetUdid() {
    PulseInsights.getInstance.resetUdid()
  }
}

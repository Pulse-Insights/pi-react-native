import Foundation
import PulseInsights
import React

@objc(RCTInlineSurveyViewManager)
class RCTInlineSurveyViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return RCTInlineSurveyView()
  }
}

class RCTInlineSurveyView: UIView {
  internal var identifier: String = ""
  internal var inlineSurveyView: InlineSurveyView?
  private var hasTriggeredFinish = false
  
  @objc var onFinish: RCTDirectEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.backgroundColor = .clear
    print("RCTInlineSurveyView: Initialized")
    
    // Listen for the inline survey finished notification
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(handleInlineSurveyFinished),
      name: NSNotification.Name("PulseInsightsInlineSurveyFinished"),
      object: nil
    )
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(handleInlineSurveyFinished),
      name: NSNotification.Name("PulseInsightsInlineSurveyFinished"),
      object: nil
    )
  }
  
  deinit {
    NotificationCenter.default.removeObserver(self)
    inlineSurveyView?.removeFromSuperview()
    inlineSurveyView = nil
    print("RCTInlineSurveyView: Deinitialized")
  }
  
  @objc private func handleInlineSurveyFinished() {
    print("RCTInlineSurveyView: Received inline survey finished notification")
    sendFinishEvent()
  }
  
  @objc func setIdentifier(_ identifier: NSString) {
    let identifierString = identifier as String
    if self.identifier != identifierString {
      self.identifier = identifierString
      
      inlineSurveyView?.removeFromSuperview()
      hasTriggeredFinish = false
      
      if !identifierString.isEmpty {
        DispatchQueue.main.async {
          self.setupInlineSurvey()
        }
      }
    }
  }
  
  private func setupInlineSurvey() {
    guard let viewController = self.findViewController() else {
      print("RCTInlineSurveyView: Cannot find view controller")
      return
    }
    
    PulseInsights.getInstance.setViewController(viewController)
    
    inlineSurveyView = InlineSurveyView(identifier: identifier)
    
    if let surveyView = inlineSurveyView {
      surveyView.translatesAutoresizingMaskIntoConstraints = false
      
      // Add the survey view to our hierarchy immediately
      self.addSubview(surveyView)
      
      NSLayoutConstraint.activate([
        surveyView.topAnchor.constraint(equalTo: self.topAnchor),
        surveyView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
        surveyView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
        surveyView.trailingAnchor.constraint(equalTo: self.trailingAnchor)
      ])
      
      print("RCTInlineSurveyView: Inline survey view created with ID: \(identifier)")
    }
  }
  
  // Send finish event to React Native
  func sendFinishEvent() {
    if hasTriggeredFinish {
      return // Prevent multiple triggers
    }
    
    hasTriggeredFinish = true
    
    // Clean up view and send event
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }
      
      self.inlineSurveyView?.removeFromSuperview()
      self.inlineSurveyView = nil
      
      if let onFinish = self.onFinish {
        onFinish(["success": true])
      }
    }
  }
  
  private func findViewController() -> UIViewController? {
    var responder: UIResponder? = self
    while let nextResponder = responder?.next {
      responder = nextResponder
      if let viewController = responder as? UIViewController {
        return viewController
      }
    }
    
    return UIApplication.shared.keyWindow?.rootViewController
  }
} 

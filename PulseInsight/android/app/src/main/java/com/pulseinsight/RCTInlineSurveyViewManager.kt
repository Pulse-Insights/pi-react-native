package com.pulseinsight

import android.app.Activity
import android.util.Log
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.pulseinsights.surveysdk.PulseInsights
import com.pulseinsights.surveysdk.util.InlineSurveyView

class RCTInlineSurveyViewManager : SimpleViewManager<RCTInlineSurveyView>() {
    
    companion object {
        private const val REACT_CLASS = "RCTInlineSurveyView"
        private const val TAG = "RCTInlineSurveyView"
    }

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): RCTInlineSurveyView {
        return RCTInlineSurveyView(reactContext)
    }

    @ReactProp(name = "identifier")
    fun setIdentifier(view: RCTInlineSurveyView, identifier: String?) {
        view.setIdentifier(identifier)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.builder<String, Any>()
            .put("onFinish", MapBuilder.of("registrationName", "onFinish"))
            .build()
    }
}

class RCTInlineSurveyView(private val reactContext: ThemedReactContext) : FrameLayout(reactContext) {
    
    companion object {
        private const val TAG = "RCTInlineSurveyView"
    }
    
    private var identifier: String = ""
    private var inlineSurveyView: InlineSurveyView? = null
    private var hasTriggeredFinish = false
    private var isDestroyed = false

    init {
        Log.d(TAG, "RCTInlineSurveyView initialized")
    }

    fun setIdentifier(identifier: String?) {
        if (isDestroyed) {
            Log.w(TAG, "Attempting to set identifier on destroyed view")
            return
        }
        
        val newIdentifier = identifier ?: ""
        
        if (this.identifier != newIdentifier) {
            this.identifier = newIdentifier
            
            // Clean up existing view safely
            cleanupInlineSurvey()
            
            hasTriggeredFinish = false
            
            if (newIdentifier.isNotEmpty()) {
                setupInlineSurvey()
            }
        }
    }

    private fun cleanupInlineSurvey() {
        try {
            inlineSurveyView?.let { view ->
                if (view.parent == this) {
                    removeView(view)
                }
                inlineSurveyView = null
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error cleaning up inline survey view", e)
        }
    }

    private fun setupInlineSurvey() {
        if (isDestroyed) {
            Log.w(TAG, "Attempting to setup inline survey on destroyed view")
            return
        }

        try {
            val currentActivity = reactContext.currentActivity
            if (currentActivity == null) {
                Log.e(TAG, "Cannot setup inline survey - no current activity")
                return
            }

            if (currentActivity.isFinishing || currentActivity.isDestroyed) {
                Log.w(TAG, "Activity is finishing or destroyed, skipping inline survey setup")
                return
            }

            // Ensure we're on the main thread
            post {
                try {
                    if (isDestroyed) {
                        Log.w(TAG, "View was destroyed during setup")
                        return@post
                    }

                    // Double check activity state
                    if (currentActivity.isFinishing || currentActivity.isDestroyed) {
                        Log.w(TAG, "Activity became invalid during setup")
                        return@post
                    }

                    // Ensure PulseInsights is initialized and set context
                    PulseInsights.getInstant()?.let { pi ->
                        Log.d(TAG, "Setting up inline survey with identifier: $identifier")
                        pi.setContext(currentActivity)
                        
                        // Create inline survey view
                        inlineSurveyView = InlineSurveyView(currentActivity, identifier).apply {
                            // Add to our container with proper layout params
                            val layoutParams = LayoutParams(
                                LayoutParams.MATCH_PARENT, 
                                LayoutParams.WRAP_CONTENT
                            )
                            
                            // Safely add the view
                            if (!isDestroyed && parent == null) {
                                this@RCTInlineSurveyView.addView(this, layoutParams)
                            }
                        }
                        
                        Log.d(TAG, "Inline survey view created successfully with identifier: $identifier")
                    } ?: Log.e(TAG, "Cannot setup inline survey - PulseInsights not initialized")
                } catch (e: Exception) {
                    Log.e(TAG, "Error in setupInlineSurvey execution", e)
                }
            }
            
        } catch (e: Exception) {
            Log.e(TAG, "Failed to setup inline survey", e)
        }
    }

    fun sendFinishEvent() {
        if (hasTriggeredFinish) {
            return // Prevent multiple triggers
        }
        
        hasTriggeredFinish = true
        
        try {
            // Clean up view
            inlineSurveyView?.let { view ->
                removeView(view)
                inlineSurveyView = null
            }
            
            // Send event to React Native
            val event = Arguments.createMap().apply {
                putBoolean("success", true)
            }
            
            (context as ReactContext).getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(id, "onFinish", event)
                    
            Log.d(TAG, "Finish event sent to React Native")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to send finish event", e)
        }
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        isDestroyed = true
        
        try {
            cleanupInlineSurvey()
        } catch (e: Exception) {
            Log.e(TAG, "Error during cleanup in onDetachedFromWindow", e)
        }
        
        Log.d(TAG, "RCTInlineSurveyView detached from window and cleaned up")
    }
} 
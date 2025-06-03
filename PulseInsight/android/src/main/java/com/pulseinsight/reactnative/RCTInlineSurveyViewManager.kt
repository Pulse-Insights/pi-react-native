package com.pulseinsight.reactnative

import android.util.Log
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.pulseinsights.surveysdk.PulseInsights
import com.pulseinsights.surveysdk.util.InlineSurveyView

class RCTInlineSurveyViewManager : SimpleViewManager<InlineSurveyView>() {
    
    companion object {
        private const val REACT_CLASS = "RCTInlineSurveyView"
        private const val TAG = "RCTInlineSurveyViewManager"
    }

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): InlineSurveyView {
        // Ensure PulseInsights is initialized
        reactContext.currentActivity?.let {
            PulseInsights.getInstant()?.setContext(it)
        }
        
        // Create and return a direct instance of InlineSurveyView
        return InlineSurveyView(reactContext.currentActivity)
    }

    @ReactProp(name = "identifier")
    fun setIdentifier(view: InlineSurveyView, identifier: String?) {
        // Simply pass the identifier to the view
        identifier?.let { view.setIdentifier(it) }
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.builder<String, Any>()
            .put("onFinish", MapBuilder.of("registrationName", "onFinish"))
            .put("onContentLoaded", MapBuilder.of("registrationName", "onContentLoaded"))
            .build()
    }
}
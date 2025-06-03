package com.pulseinsight.reactnative

import android.app.Activity
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.pulseinsights.surveysdk.PulseInsights
import com.pulseinsights.surveysdk.ExtraConfig
import com.pulseinsights.surveysdk.util.InlineSurveyView

@ReactModule(name = RCTPulseInsightModule.NAME)
class RCTPulseInsightModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    companion object {
        const val NAME = "RCTPulseInsight"
        private const val TAG = "RCTPulseInsight"
    }
    
    private var pulseInsights: PulseInsights? = null

    override fun getName(): String = NAME

    @ReactMethod
    fun initialize(config: ReadableMap) {
        try {
            val accountId = config.getString("accountId")
            if (accountId.isNullOrEmpty()) {
                Log.e(TAG, "Account ID is required for initialization")
                return
            }

            val enableDebugMode = if (config.hasKey("enableDebugMode")) config.getBoolean("enableDebugMode") else false
            val previewMode = if (config.hasKey("previewMode")) config.getBoolean("previewMode") else false
            
            // Setup ExtraConfig
            val extraConfig = ExtraConfig().apply {
                automaticStart = false  // Set to false for better control
                this.previewMode = previewMode
                
                // Handle custom data
                if (config.hasKey("customData") && config.getMap("customData") != null) {
                    val customDataMap = config.getMap("customData")!!
                    customData = HashMap<String, String>().apply {
                        customDataMap.toHashMap().forEach { (key, value) ->
                            if (value is String) {
                                put(key, value)
                            }
                        }
                    }
                }
            }

            currentActivity?.let { activity ->
                pulseInsights = PulseInsights(activity, accountId, extraConfig).apply {
                    setDebugMode(enableDebugMode)
                }
                Log.d(TAG, "PulseInsights SDK initialized with account ID: $accountId")
            } ?: Log.e(TAG, "Cannot initialize PulseInsights - no current activity")
            
        } catch (e: Exception) {
            Log.e(TAG, "Failed to initialize PulseInsights SDK", e)
        }
    }

    @ReactMethod
    fun setAccountID(accountId: String) {
        try {
            pulseInsights?.let {
                it.configAccountId(accountId)
                // This would require reinitializing the SDK
                Log.w(TAG, "setAccountID called - consider reinitializing SDK for account change")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set account ID", e)
        }
    }

    @ReactMethod
    fun setViewName(viewName: String) {
        try {
            pulseInsights?.setViewName(viewName)
            Log.d(TAG, "View name set to: $viewName")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set view name", e)
        }
    }

    @ReactMethod
    fun setScanFrequency(frequencyInSeconds: Int) {
        try {
            pulseInsights?.setScanFrequency(frequencyInSeconds)
            Log.d(TAG, "Scan frequency set to: $frequencyInSeconds seconds")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set scan frequency", e)
        }
    }

    @ReactMethod
    fun serve() {
        try {
            pulseInsights?.let { pi ->
                Log.d(TAG, "=== Starting serve process ===")
                
                val activity = currentActivity
                if (activity == null) {
                    Log.e(TAG, "No current activity available for serve")
                    return
                }
                
                if (activity.isFinishing || activity.isDestroyed) {
                    Log.w(TAG, "Activity is finishing or destroyed, skipping serve")
                    return
                }
                
                Log.d(TAG, "Setting context and calling serve...")
                pi.setContext(activity)
                pi.serve()
                Log.d(TAG, "Serve completed")
                
            } ?: Log.e(TAG, "PulseInsights not initialized")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to serve", e)
        }
    }

    @ReactMethod
    fun present(surveyId: String) {
        try {
            pulseInsights?.present(surveyId)
            Log.d(TAG, "Presenting survey: $surveyId")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to present survey", e)
        }
    }

    @ReactMethod
    fun switchSurveyScan(enable: Boolean) {
        try {
            pulseInsights?.switchSurveyScan(enable)
            Log.d(TAG, "Survey scan ${if (enable) "enabled" else "disabled"}")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to switch survey scan", e)
        }
    }

    @ReactMethod
    fun isSurveyScanWorking(promise: Promise) {
        try {
            val isWorking = pulseInsights?.isSurveyRenderingActive() ?: false
            promise.resolve(isWorking)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to check survey scan status", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun setClientKey(clientKey: String) {
        try {
            pulseInsights?.setClientKey(clientKey)
            Log.d(TAG, "Client key set")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set client key", e)
        }
    }

    @ReactMethod
    fun getClientKey(promise: Promise) {
        try {
            val clientKey = pulseInsights?.getClientKey()
            promise.resolve(clientKey)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to get client key", e)
            promise.resolve(null)
        }
    }

    @ReactMethod
    fun setPreviewMode(enable: Boolean) {
        try {
            pulseInsights?.setPreviewMode(enable)
            Log.d(TAG, "Preview mode ${if (enable) "enabled" else "disabled"}")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set preview mode", e)
        }
    }

    @ReactMethod
    fun isPreviewModeOn(promise: Promise) {
        try {
            val isOn = pulseInsights?.isPreviewModeOn() ?: false
            promise.resolve(isOn)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to check preview mode status", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun checkSurveyAnswered(surveyId: String, promise: Promise) {
        try {
            val answered = pulseInsights?.checkSurveyAnswered(surveyId) ?: false
            promise.resolve(answered)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to check if survey was answered", e)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun setContextData(data: ReadableMap, merge: Boolean = false) {
        try {
            pulseInsights?.let { pi ->
                val contextData = HashMap<String, String>().apply {
                    data.toHashMap().forEach { (key, value) ->
                        if (value is String) {
                            put(key, value)
                        }
                    }
                }
                pi.setContextData(contextData, merge)
                Log.d(TAG, "Context data set with ${contextData.size} entries (merge: $merge)")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set context data", e)
        }
    }

    @ReactMethod
    fun clearContextData() {
        try {
            pulseInsights?.clearContextData()
            Log.d(TAG, "Context data cleared")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to clear context data", e)
        }
    }

    @ReactMethod
    fun setDeviceData(data: ReadableMap) {
        try {
            pulseInsights?.let { pi ->
                val deviceData = HashMap<String, String>().apply {
                    data.toHashMap().forEach { (key, value) ->
                        if (value is String) {
                            put(key, value)
                        }
                    }
                }
                pi.setDeviceData(deviceData)
                Log.d(TAG, "Device data set with ${deviceData.size} entries")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set device data", e)
        }
    }

    @ReactMethod
    fun setHost(hostName: String) {
        try {
            pulseInsights?.setHost(hostName)
            Log.d(TAG, "Host set to: $hostName")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set host", e)
        }
    }

    @ReactMethod
    fun setDebugMode(enable: Boolean) {
        try {
            pulseInsights?.setDebugMode(enable)
            Log.d(TAG, "Debug mode ${if (enable) "enabled" else "disabled"}")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to set debug mode", e)
        }
    }

    @ReactMethod
    fun resetUdid() {
        try {
            pulseInsights?.resetUdid()
            Log.d(TAG, "UDID reset")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to reset UDID", e)
        }
    }

    @ReactMethod
    fun finishInlineMode() {
        try {
            pulseInsights?.finishInlineMode()
            Log.d(TAG, "finishInlineMode called (Android compatibility method)")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to finish inline mode", e)
        }
    }
} 
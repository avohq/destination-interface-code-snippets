// Amplitude Destination Implementation for Kotlin Android
// This is a basic setup example, tweak according to your needs

import android.content.Context
import com.amplitude.android.Amplitude
import com.amplitude.android.Configuration
import com.amplitude.core.events.Identify
import com.amplitude.core.events.Revenue

class AmplitudeDestination : ICustomDestination {
    private var amplitude: Amplitude? = null

    // Pick one of the make methods to implement
    override fun make(env: AvoEnv) {
        amplitude = Amplitude(Configuration("YOUR_API_KEY", env.context))
    }

    override fun make(env: AvoEnv, apiKey: String?) {
        if (apiKey != null && env.context != null) {
            amplitude = Amplitude(Configuration(apiKey, env.context))
        }
    }

    override fun logEvent(eventName: String, eventProperties: Map<String, *>) {
        amplitude?.track(eventName, eventProperties)
    }

    override fun logPage(pageName: String, eventProperties: Map<String, *>) {
        val properties = eventProperties.toMutableMap()
        properties["page_name"] = pageName
        amplitude?.track("Page View", properties)
    }

    override fun revenue(amount: Double, eventProperties: Map<String, *>) {
        amplitude?.let { amp ->
            val revenue = Revenue().setPrice(amount)
            eventProperties["product_id"]?.let { revenue.setProductId(it.toString()) }
            eventProperties["quantity"]?.let { 
                val qty = (it as? Number)?.toInt() ?: 1
                revenue.setQuantity(qty) 
            }
            amp.revenue(revenue)
        }
    }

    override fun setUserProperties(userId: String, userProperties: Map<String, *>) {
        amplitude?.let { amp ->
            amp.setUserId(userId)
            val identify = Identify()
            userProperties.forEach { (key, value) ->
                identify.set(key, value)
            }
            amp.identify(identify)
        }
    }

    override fun identify(userId: String) {
        amplitude?.setUserId(userId)
    }

    override fun unidentify() {
        amplitude?.setUserId(null)
    }
}
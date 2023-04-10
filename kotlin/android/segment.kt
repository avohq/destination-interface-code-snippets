...
import com.segment.analytics.Analytics
import com.segment.analytics.Properties
import com.segment.analytics.Traits
...

private class SegmentDestination(context: Context) {

    private val applicationContext = context.applicationContext

    private lateinit var segment: Analytics

    private fun hashMapToProperties(map: Map<String, *>): Properties {
        val properties = Properties()
        for ((k, v) in map) {
        properties.putValue(k, v)
        }
        return properties
    }

    private fun hashMapToTraits(map: Map<String, *>): Traits {
        val traits = Traits()
        for ((k, v) in map) {
        traits.putValue(k, v)
        }
        return traits
    }

    override fun make(env: AvoEnv, apiKey: String?) {
        segment = Analytics.Builder(applicationContext, apiKey)
        .trackApplicationLifecycleEvents()
        .recordScreenViews()
        .build()
    }

    override fun logEvent(eventName: String, eventProperties: Map<String, *>) {
        segment.track(eventName, hashMapToProperties(eventProperties))
    }

    override fun setUserProperties(userId: String, userProperties: Map<String, *) {
        segment.identify(hashMapToTraits(userProperties))
    }

    override fun logPage(pageName: String, eventProperties: Map<String, *>) {
        segment.screen(pageName, hashMapToProperties(eventProperties))
    }

    override fun revenue(amount: Double, eventProperties: Map<String, *>) {
        segment.track("User spent: $amount", hashMapToProperties(eventProperties))
    }

    override fun identify(userId: String) {
        segment.identify(userId)
    }

    override fun unidentify() {
        segment.reset()
    }
}

val segmentDestinationInterface = SegmentDestination(context.applicationContext)


AvoImpl(...,
      myDestination = segmentDestinationInterface)
import Rudder

// See RudderStack iOS SDK docs for more information
// https://www.rudderstack.com/docs/stream-sources/rudderstack-sdk-integration-guides/rudderstack-ios-sdk/
class CustomDestination: AvoCustomDestination {
    func make(env: AvoEnv, apiKey: String) {
        // Learn how to get DATA_PLANE_URL and WRITE_KEY here 
        // https://www.rudderstack.com/docs/stream-sources/rudderstack-sdk-integration-guides/rudderstack-ios-sdk/#sdk-setup-requirements

        let builder: RSConfigBuilder = RSConfigBuilder().withDataPlaneUrl(DATA_PLANE_URL)
        RSClient.getInstance(WRITE_KEY, config: builder.build())
    }
    
    func logEvent(eventName: String, eventProperties: [String : Any]) {
        RSClient.sharedInstance()?.track(eventName, properties: eventProperties)
    }
    
    func setUserProperties(userId: String, userProperties: [String : Any]) {
        if !userProperties.isEmpty {
            RSClient.sharedInstance()?.identify(userId, traits: userProperties)
        }
    }

    func logPage(pageName: String, eventProperties: [String:Any]) { 
        RSClient.sharedInstance()?.screen(pageName, properties: eventProperties)
    }

    func revenue(amount: Double, eventProperties: [String:Any]) {
        // Rudderstack does not support revenue tracking, you can use logEvent to track revenue manually
    }

    func identify(userId: String) {
        RSClient.sharedInstance()?.identify(userId)
    }
    
    func unidentify() {
        [[RSClient sharedInstance] reset];
    }
}
// Amplitude Destination Implementation for Swift iOS
// This is a basic setup example, tweak according to your needs

class AmplitudeDestination: AvoCustomDestination {
    private var amplitude: Amplitude?
    
    // Pick one of the make methods to implement
    func make(env: AvoEnv) {
        amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR_API_KEY"))
    }
    
    func make(env: AvoEnv, apiKey: String?) {
        if let apiKey = apiKey {
            amplitude = Amplitude(configuration: Configuration(apiKey: apiKey))
        }
    }
    
    func logEvent(eventName: String, eventProperties: [String: Any]) {
        amplitude?.track(eventName: eventName, eventProperties: eventProperties)
    }
    
    func logPage(pageName: String, eventProperties: [String: Any]) {
        var properties = eventProperties
        properties["page_name"] = pageName
        amplitude?.track(eventName: "Page View", eventProperties: properties)
    }
    
    func revenue(amount: Double, eventProperties: [String: Any]) {
        guard let amplitude = amplitude else { return }
        
        let revenue = Revenue()
        revenue.price = amount
        
        if let productId = eventProperties["product_id"] as? String {
            revenue.productId = productId
        }
        
        if let quantity = eventProperties["quantity"] as? Int {
            revenue.quantity = quantity
        } else if let quantity = eventProperties["quantity"] as? Double {
            revenue.quantity = Int(quantity)
        }
        
        amplitude.revenue(revenue: revenue)
    }
    
    func setUserProperties(userId: String, userProperties: [String: Any]) {
        guard let amplitude = amplitude else { return }
        
        amplitude.setUserId(userId: userId)
        
        let identify = Identify()
        for (key, value) in userProperties {
            identify.set(property: key, value: value)
        }
        amplitude.identify(identify: identify)
    }
    
    func identify(userId: String) {
        amplitude?.setUserId(userId: userId)
    }
    
    func unidentify() {
        amplitude?.setUserId(userId: nil)
    }
} 
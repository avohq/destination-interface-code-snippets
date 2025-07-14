// Install the Segment Swift SDK: Add to your Package.swift or through SPM
// .package(url: "https://github.com/segmentio/analytics-swift", from: "1.0.0")
// Learn more about the Segment Swift SDK: https://segment.com/docs/connections/sources/catalog/libraries/mobile/apple/

import Segment

var analytics: Analytics?

struct SegmentDestinationInterface {
    
    static func make(_ env: String, apiKey: String) {
        let configuration = Configuration(writeKey: apiKey)
        analytics = Analytics(configuration: configuration)
    }
    
    static func identify(userId: String) {
        analytics?.identify(userId: userId)
    }
    
    static func logEvent(eventName: String, eventProperties: [String: Any]?) {
        analytics?.track(name: eventName, properties: eventProperties)
    }
    
    static func setUserProperties(userProperties: [String: Any]) {
        analytics?.identify(traits: userProperties)
    }
    
    static func unidentify() {
        analytics?.reset()
    }
    
    static func logPage(eventName: String, eventProperties: [String: Any]?) {
        analytics?.screen(title: eventName, properties: eventProperties)
    }
    
    static func revenue(amount: Double, eventProperties: [String: Any]?) {
        var properties = eventProperties ?? [:]
        properties["revenue"] = amount
        analytics?.track(name: "Purchase Complete", properties: properties)
    }
    
    // The following methods are used for group analytics and are not required. 
    // Learn more about group analytics here: https://www.avo.app/docs/data-design/groups
    static func setGroupProperties(_ groupType: String, groupId: String, groupProperties: [String: Any]) {
        analytics?.group(groupId: groupId, traits: groupProperties)
    }
    
    static func addCurrentUserToGroup(_ groupType: String, groupId: String) {
        analytics?.group(groupId: groupId)
    }
    
    // Note: logEventWithGroups is not directly supported by the Segment Swift SDK
    // You would need to implement custom logic or use the group method separately
    // static func logEventWithGroups(eventName: String, eventProperties: [String: Any]?, groupTypesToGroupIds: [String: String]) {
    //     // Custom implementation needed
    // }
}

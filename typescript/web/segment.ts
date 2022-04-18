// Example: Destination interface for the Segment SDK. Replace the Segment implementation with your own tracking SDK methods
let customDestination = {
  make: function (env: AvoEnv, apiKey: string) {
    analytics.load(apiKey)
  },
  logEvent: function (eventName: string, eventProperties: object) {
    analytics.track(eventName, eventProperties)
  },
  setUserProperties: function (userId: string, userProperties: object) {
    analytics.identify(userId, userProperties);
  },
  identify: function (userId: string) {
    analytics.identify(userId);
  },
  unidentify: function () {
    analytics.identify(null);
  },
  logPage: function (pageName: string, eventProperties: object) {
    analytics.page(eventProperties.assign({"pageName": pageName}));
  },
  revenue: function (amount: number, eventProperties: object) {
    analytics.track("Purchase Complete", eventProperties.assign({"revenue": amount}))
  },
  // The following methods are used for group analytics and are not required. Learn more about group analytics <Link passHref href="/data-design/groups"><a>here</a></Link>
  setGroupProperties(
    groupType: string,
    groupId: string,
    groupProperties: object,
  ) {
    analytics.group(groupId, groupProperties);
  },
  addCurrentUserToGroup: function (
    groupType: string,
    groupId: string,
  ) {
    analytics.group(groupId)
  },
  logEventWithGroups: function (
    eventName: string,
    eventProperties: object,
    groupTypesToGroupIds: object,
  ) {
    // Not supported by the Segment SDK
  },
};

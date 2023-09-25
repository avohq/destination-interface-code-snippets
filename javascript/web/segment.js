// Install the Segment browser library: npm install --save @segment/analytics-next
import { AnalyticsBrowser } from "@segment/analytics-next"; // Tested with version 1.49.2

let analytics;

const segmentDestinationInterface = {
  make: (_env, apiKey) => {
    analytics = AnalyticsBrowser.load({ writeKey: apiKey });
  },

  identify: (userId) => analytics.identify(userId),

  logEvent: (eventName, eventProperties) =>
    analytics.track(eventName, eventProperties),

  setUserProperties: (userProperties) => analytics.identify(userProperties),

  unidentify: () => analytics.reset(),

  page: (eventName, eventProperties) =>
    analytics.page(eventName, eventProperties),

  revenue: (amount, eventProperties) =>
    analytics.track("Purchase Complete", {
      ...eventProperties,
      revenue: amount,
    }),

  // The following methods are used for group analytics and are not required. Learn more about group analytics here: https://www.avo.app/docs/data-design/groups
  setGroupProperties: (_groupType, groupId, groupProperties) =>
    analytics.group(groupId, groupProperties),

  addCurrentUserToGroup: (_groupType, groupId) => analytics.group(groupId),

  // Not supported by the Segment SDK
  // logEventWithGroups: (eventName, eventProperties, groupTypesToGroupIds) => {},
};

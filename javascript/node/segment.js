// Install the official Segment Node.js SDK: npm i --save analytics-node
import Analytics from "analytics-node"; // Tested with version 6.2.0

let analytics;

const segmentDestinationInterface = {
  make: (_env, apiKey) => {
    analytics = new Analytics(apiKey, { flushAt: 1 });
  },

  identify: (userId) => analytics.identify({ userId }),

  logEvent: (userId, eventName, eventProperties) =>
    analytics.track({ userId, event: eventName, properties: eventProperties }),

  setUserProperties: (userId, userProperties) =>
    analytics.identify({ userId, traits: userProperties }),

  logPage: (userId, pageName, eventProperties) =>
    analytics.page({ userId, name: pageName, properties: eventProperties }),

  revenue: (userId, amount, eventProperties) =>
    analytics.track({
      userId,
      event: "Revenue",
      properties: { ...eventProperties, amount },
    }),

  // The following methods are used for group analytics and you might not need them. Learn more about group analytics here: https://www.avo.app/docs/data-design/groups
  addCurrentUserToGroup: (userId, _groupType, groupId) =>
    analytics.group({ userId, groupId }),

  setGroupProperties: (userId, _groupType, groupId, groupProperties) =>
    analytics.group({ userId, groupId, traits: groupProperties }),

  // Not supported by the Segment SDK
  // logEventWithGroups: (eventName, eventProperties, groupTypesToGroupIds) => {},
};

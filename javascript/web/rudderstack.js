// Install the official RudderStack browser SDK: npm i --save rudder-sdk-js
import * as rudderanalytics from 'rudder-sdk-js'; // Tested with version 2.24.0

const rudderstackDestinationInterface = {
  make: (_env, apiKey) => {
    rudderanalytics.load(apiKey, DATA_PLANE_URL);
    rudderanalytics.ready(() => ({}));
  },

  identify: (userId) => rudderanalytics.identify(userId),

  logEvent: (eventName, eventProperties) =>
    rudderanalytics.track(eventName, eventProperties),

  page: (eventName, eventProperties) =>
    rudderanalytics.page(undefined, eventName, eventProperties),

  setUserProperties: (userId, userProperties) =>
    rudderanalytics.identify(userId, userProperties),

  unidentify: () => rudderanalytics.reset(),

  revenue: (amount, eventProperties) =>
    // RudderStack doesn't have a specific API for tracking revenue
    rudderanalytics.track('Revenue', { revenue: amount, ...eventProperties }),

  setGroupProperties: (_groupTypeName, groupId, groupProperties) =>
    rudderanalytics.group(groupId, groupProperties),

  addCurrentUserToGroup: (_groupTypeName, groupId) =>
    rudderanalytics.group(groupId),

  // RudderStack doesn't support logging events with groups
  // logEventWithGroups: (eventName, eventProperties, groupTypeNamesToGroupIds) => ({})
};

// Install the Segment browser library: npm install --save @segment/analytics-next
import { AnalyticsBrowser } from "@segment/analytics-next"; // Tested with version 1.49.2

// Import the Avo Codegen file from the location you've chosen
import { CustomDestination } from "../path/to/Avo";

let analytics: AnalyticsBrowser | undefined;

const segmentDestinationInterface: CustomDestination = {
  make: (_env, apiKey) => {
    analytics = AnalyticsBrowser.load({ writeKey: apiKey });
  },

  identify: (userId) => analytics?.identify(userId),

  logEvent: (eventName, eventProperties) =>
    analytics?.track(eventName, eventProperties),

  setUserProperties: (userProperties) => analytics?.identify(userProperties),

  unidentify: () => analytics?.reset(),

  logPage: (eventName, eventProperties) =>
    analytics?.page(eventName, eventProperties),

  revenue: (amount, eventProperties) =>
    analytics?.track("Purchase Complete", {
      ...eventProperties,
      revenue: amount,
    }),

  // The following methods are used for group analytics and are not required. Learn more about group analytics here: https://www.avo.app/docs/data-design/groups
  setGroupProperties: (_groupType, groupId, groupProperties) =>
    analytics?.group(groupId, groupProperties),

  addCurrentUserToGroup: (_groupType, groupId) => analytics?.group(groupId),

  // Not supported by the Segment SDK
  // logEventWithGroups: (eventName, eventProperties, groupTypesToGroupIds) => {},
};

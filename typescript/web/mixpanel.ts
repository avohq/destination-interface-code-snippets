// Install the official Mixpanel browser SDK: npm i --save mixpanel-browser
import mixpanel from "mixpanel-browser";
// Optionally install the Defenitely Typed package: npm i --save-dev @types/mixpanel-browser

// Import the Codegen file from the location you've chosen
import { AvoEnv, CustomDestination } from "../path/to/Avo";

const mixpanelDestinationInterface: CustomDestination = {
  make: (env, apiKey) =>
    mixpanel.init(apiKey, {
      debug: env != AvoEnv.Prod,
      ignore_dnt: env == AvoEnv.Dev,
    }),

  identify: (userId) => mixpanel.identify(userId),

  logEvent: (eventName, eventProperties) =>
    mixpanel.track(eventName, eventProperties),

  setUserProperties: (_userId, userProperties) =>
    mixpanel.people.set(userProperties),

  unidentify: () => mixpanel.reset(),

  addCurrentUserToGroup: (groupTypeName, groupId) =>
    mixpanel.set_group(groupTypeName, groupId),

  logEventWithGroups: (eventName, eventProperties, groupTypeNamesToGroupIds) =>
    mixpanel.track_with_groups(
      eventName,
      eventProperties,
      groupTypeNamesToGroupIds
    ),

  setGroupProperties: (groupTypeName, groupId, groupProperties) =>
    mixpanel.get_group(groupTypeName, groupId).set(groupProperties),

  // revenue: (amount, eventProperties) => {}
  // Mixpanel does not support revenue tracking out of the box
};

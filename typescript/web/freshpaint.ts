// Install the freshpaint SDK: https://documentation.freshpaint.io/readme/guides/quickstart/installing-freshpaint

// Import the Avo Codegen file from the location you've chosen
import { CustomDestination } from "../path/to/Avo";

// Get the Freshpaint types from here: https://documentation.freshpaint.io/readme/guides/quickstart/how-do-i-install-freshpaint-with-typescript

const freshpaintDestinationInterface: CustomDestination = {
  make: (_env, _apiKey) => {
    // Required if you haven't initialized the Freshpaint SDK in your app already
    freshpaint.init();
    freshpaint.page();
  },

  identify: (userId) => freshpaint.identify(userId),

  logEvent: (eventName, eventProperties) =>
    freshpaint.track(eventName, eventProperties as Record<string, unknown>),

  setUserProperties: function (userId, userProperties) {
    freshpaint.identify(userId, userProperties as Record<string, unknown>);
  },

  unidentify: () => freshpaint.reset(),

  logPage: (pageName, eventProperties) =>
    freshpaint.page({ ...eventProperties, name: pageName } as Record<
      string,
      unknown
    >),

  // Revenue is not supported by Freshpaint
  revenue: (_amount, _eventProperties) =>
    console.log("Revenue tracking not supported by Freshpaint"),

  setGroupProperties: (_groupType, groupId, groupProperties) =>
    freshpaint.group(groupId, groupProperties),
};

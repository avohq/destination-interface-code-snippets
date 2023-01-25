// Install the freshpaint SDK: https://documentation.freshpaint.io/readme/guides/quickstart/installing-freshpaint

const freshpaintDestinationInterface = {
  make: (_env, _apiKey) => {
    // Required if you haven't initialized the Freshpaint SDK in your app already
    freshpaint.init();
    freshpaint.page();
  },

  identify: (userId) => freshpaint.identify(userId),

  logEvent: (eventName, eventProperties) =>
    freshpaint.track(eventName, eventProperties),

  setUserProperties: (userId, userProperties) =>
    freshpaint.identify(userId, userProperties),

  unidentify: () => freshpaint.reset(),

  logPage: (pageName, eventProperties) =>
    freshpaint.page({ ...eventProperties, name: pageName }),

  // Revenue is not supported by Freshpaint
  revenue: (_amount, _eventProperties) =>
    console.log("Revenue tracking not supported by Freshpaint"),

  setGroupProperties: (_groupType, groupId, groupProperties) =>
    freshpaint.group(groupId, groupProperties),
};

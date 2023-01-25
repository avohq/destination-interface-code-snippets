// Install Heap following their guide: https://developers.heap.io/docs/web
// Heap should now be available as window.heap

const heapDestinationInterface = {
  make: (_env, apiKey) =>
    window.heap.load(apiKey, { disableTextCapture: true }),

  identify: (userId) => window.heap.identify(userId),

  logEvent: (eventName, eventProperties) =>
    window.heap.track(eventName, eventProperties),

  setUserProperties: (_userId, userProperties) =>
    window.heap.addUserProperties(userProperties),

  unidentify: () => window.heap.resetIdentity(),

  logPage: (pageName, eventProperties) =>
    // Heap doesn't support page tracking out of the box but we could
    // implement it manually by tracking a "page" event like this:
    window.heap.track("page", { ...eventProperties, pageName }),

  revenue: (amount, eventProperties) =>
    // Heap doesn't support revenue tracking out of the box but we could
    // implement it manually by tracking a "revenue" event like this:
    window.heap.track("revenue", { ...eventProperties, revenue: amount }),
};

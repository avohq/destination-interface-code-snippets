let customDestination = {
  logEvent: function (eventName, eventProperties) {
    window.heap.track(
      eventName,
      eventProperties as Record<string, unknown>
    )
  },
  setUserProperties: function (userId, userProperties) {
    window.heap.addUserProperties(
      userProperties as Record<string, unknown>
    )
  },
  identify: function (userId) {
    window.heap.identify(userId)
  },
  unidentify: function () {
    window.heap.resetIdentity()
  },
}
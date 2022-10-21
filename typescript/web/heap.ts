let heapDestinationInterface = {
  make: function (env: AvoEnv, apiKey: string) {
    window.heap.load(apiKey, {
      disableTextCapture: true
    })
  },
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
  logPage: function (pageName: string, eventProperties: object) {
    window.heap.track(
      "page",
      eventProperties.assign({ "pageName": pageName }) as Record<string, unknown>
    )
  },
  revenue: function (amount: number, eventProperties: object) {
    window.heap.track(
      "revenue",
      eventProperties.assign({ "revenue": amount })
    )
  },
}
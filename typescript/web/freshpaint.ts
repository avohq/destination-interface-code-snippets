let freshpaintDestinationInterface = {
  make: function (env: AvoEnv, apiKey: string) {
    // Only required if you haven't initialized the Freshpaint SDK in your app already
    // freshpaint.init()
  },
  logEvent: function (eventName, eventProperties) {
    freshpaint.track(
      eventName,
      eventProperties as Record<string, unknown>
    )
  },
  setUserProperties: function (userId, userProperties) {
    freshpaint.identify(
      userId,
      userProperties as Record<string, unknown>
    )
  },
  identify: function (userId) {
    freshpaint.identify(userId)
  },
  unidentify: function () {
    freshpaint.reset()
  },
  logPage: function (pageName: string, eventProperties: object) {
    freshpaint.page(
      eventProperties.assign({ "name": pageName }) as Record<string, unknown>
    )
  },
  revenue: function (amount: number, eventProperties: object) {
    // Not supported by Freshpaint
    console.log("Revenue tracking not supported by Freshpaint")
  },
}

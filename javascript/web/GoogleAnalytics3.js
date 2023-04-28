import Avo from './Avo';

// An object representing your Google Analytics destination that you pass into initAvo():

var googleAnalyticsDestinationInterface = {
  logEvent: function (eventName, eventProperties) {
    this.dataLayer.push({
      ...eventProperties
      event: properties.event || 'interaction',
      category: properties.category || 'Event',
      action: properties.action,
      label: properties.label,
      value: properties.value,
      interactionType: properties.noninteraction,
      userId: ... // Todo pass in userId from your environment,
   });
  },
  setUserProperties: function (userId, userProperties) {
    // Todo: Pass user properties to Google Analytics
  },
  identify: function (userId) {
    // Todo: Identify user in Google Analytics
  },
  unidentify: function () {
    // Todo: Unidentify currently identified user in Google Analytics
  },
  revenue: function (amount, eventProperties) {
    // Todo: Log revenue in Google Analytics
  },
  page: function (screenName, eventProperties) {
    // Todo: Log page view in Google Analytics
  },
};

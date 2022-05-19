import Avo from './Avo';

// An object representing your Google Analytics destination that you pass into initAvo():
var googleAnalyticsDestinationInterface = {
  logEvent: function (eventName, eventProperties) {
    gtag('event', eventName, eventProperties);
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
    gtag('event', 'purchase', { ...eventProperties, amount });
  },
  page: function (screenName, eventProperties) {
    gtag('event', 'screen_view', {
      ...eventProperties,
      screen_name: screenName,
    });
  },
};
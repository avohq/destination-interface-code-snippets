// Install the official Amplitude browser SDK: npm i --save @amplitude/analytics-browser
import * as amplitude from "@amplitude/analytics-browser"; // Tested with version 1.7.1

const amplitudeDestinationInterface = {
  make: (_env, apiKey) => amplitude.init(apiKey),

  identify: (userId) => amplitude.setUserId(userId),

  logEvent: (eventName, eventProperties) =>
    amplitude.track(eventName, eventProperties),

  setUserProperties: (_userId, userProperties) => {
    const identify = new amplitude.Identify();
    Object.entries(userProperties).forEach(([key, value]) =>
      identify.set(key, value)
    );
    amplitude.identify(identify);
  },

  unidentify: () => amplitude.reset(),

  revenue: (amount, eventProperties) => {
    const event = new amplitude.Revenue().setPrice(amount);
    if (eventProperties.quantity) {
      event.setQuantity(eventProperties.quantity);
    }

    if (eventProperties.productId) {
      event.setProductId(eventProperties.productId);
    }

    if (eventProperties.revenueType) {
      event.setRevenueType(eventProperties.revenueType);
    }

    if (Object.keys(eventProperties).length > 0) {
      event.setEventProperties(eventProperties);
    }
    amplitude.revenue(event);
  },

  // Amplitude supports group features on the Growth and Enterprise plans
  setGroupProperties: (groupTypeName, groupId, groupProperties) => {
    const group = new amplitude.Identify();
    Object.entries(groupProperties).forEach(([key, value]) =>
      group.set(key, value)
    );
    amplitude.groupIdentify(groupTypeName, groupId, group);
  },

  addCurrentUserToGroup: (groupTypeName, groupId) =>
    amplitude.setGroup(groupTypeName, groupId),

  logEventWithGroups: (eventName, eventProperties, groupTypeNamesToGroupIds) =>
    amplitude.track({
      event_type: eventName,
      event_properties: eventProperties,
      groups: groupTypeNamesToGroupIds,
    }),
};

// Finally, add the amplitude destination interface to your initAvo call:
// Avo.initAvo(options, systemProperties, destinationOptions, amplitudeDestinationInterface)
// Note that the Amplitude destination may be a latter parameter, depending on your destinations setup.
// Look at the initAvo function in your Codegen to see exactly where the amplitude destination should be positioned.

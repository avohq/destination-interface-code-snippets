module Intercom = {
  let apiKey: ref<option<string>> = ref(None)
  let intercomDestinationInterfaceDestination: AnalyticsCfRe.avoCustomDestination = {
    make: (_env, _maybeApiKey) => {
      apiKey := _maybeApiKey
      ()
    },
    logEvent: (_userId, _eventName, _eventProperties) => {
      let apply = %raw(`
      function (apiKey, userId, eventName, eventProperties) {
        const Client = require('intercom-client').Client;
        const intercom = new Client({ tokenAuth: { token: apiKey } });
        const secondsSinceEpoch = Math.round(new Date().getTime() / 1000);
        return intercom.events.create({
            eventName: eventName,
            createdAt: secondsSinceEpoch,
            userId: userId,
            metadata: eventProperties,
        });
      }`)

      apply(. apiKey.contents, _userId, _eventName, _eventProperties) |> Js.Promise.catch(error => {
        Js.Console.warnMany(["Error when tracking event with Intercom: ", Obj.magic(error)])
        Js.Promise.resolve()
      })
    },
    setUserProperties: (_userId, _userProperties) => Js.Promise.resolve(),
    logPage: (_userId, _pageName, _eventProperties) => Js.Promise.resolve(),
    revenue: (_userId, _amount, _eventProperties) => Js.Promise.resolve(),
  }
}

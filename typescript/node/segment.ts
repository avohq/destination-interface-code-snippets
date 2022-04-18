let customDestination: CustomDestination = {
    make: function (_env: AvoEnv, apiKey: string) {
       // @ts-ignore
        let Segment = require('analytics-node');
        let instance = (new Segment(apiKey, {"flushAt": 1}) as any);
        (this as any).getInstance = () => instance;
    },
    logEvent: function (userId: any, eventName: string, eventProperties: object): Promise<void> {
        let segment = (this as any).getInstance();
        return new Promise(function(resolve: any, _reject: any) {
          segment.track({
            userId: userId,
            event: eventName,
            properties: eventProperties,
            integrations: {}
          }, function(error: any) {
            if (error) {
              console.error(
                "Error when tracking event with Segment: " + error
              );
            };
            resolve();
          });
        });
    },
    setUserProperties: function (userId: string, userProperties: object): Promise<void> {
        let segment = (this as any).getInstance();
        return new Promise(function(resolve: any, _reject: any) {
          segment.identify({
            userId: userId,
            traits: userProperties,
            integrations: {}
          }, function(error: any) {
            if (error) {
              console.error(
                "Error when tracking event with Segment: " + error
              );
            };
            resolve();
          });
        });
    },
    logPage: function (userId: string, pageName: string, eventProperties: object): Promise<void> {
        let segment = (this as any).getInstance();
        return new Promise(function(resolve: any, _reject: any) {
          segment.page({
            userId: userId,
            name: pageName,
            properties: eventProperties,
            integrations: {}
          }, function(error: any) {
            if (error) {
              console.error(
                "Error when tracking event with Segment: " + error
              );
            };
            resolve();
          });
        });
    },
    revenue: function (userId: string, amount: number, eventProperties: object): Promise<void> {
        let segment = (this as any).getInstance();
        return new Promise(function(resolve: any, _reject: any) {
          segment.track({
            userId: userId,
            event: "Revenue",
            properties: (<any>eventProperties).assign({"amount": amount}),
            integrations: {}
          }, function(error: any) {
            if (error) {
              console.error(
                "Error when tracking event with Segment: " + error
              );
            };
            resolve();
          });
        });
    },
  };

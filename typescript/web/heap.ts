// Install Heap following their guide: https://developers.heap.io/docs/web
// Heap should now be available as window.heap

// Import the Avo Codegen file from the location you've chosen
import { CustomDestination } from "../path/to/Avo";

// Get the types from here: https://developers.heap.io/reference/client-side-apis-overview
interface Heap {
  load: (appId: string, options?: Object) => void; // For some reason, the load function is missing from the docs so we're adding it
  track: (event: string, properties?: Object) => void;
  identify: (identity: string) => void;
  resetIdentity: () => void;
  addUserProperties: (properties: Object) => void;
  addEventProperties: (properties: Object) => void;
  removeEventProperty: (property: string) => void;
  clearEventProperties: () => void;
  appid: string;
  userId: string;
  identity: string | null;
  config: any;
}

// Additionally we'll need to let TypeScript know that Heap is available as window.Heap
declare global {
  interface Window {
    heap: Heap;
  }
}

const heapDestinationInterface: CustomDestination = {
  make: (_env, apiKey) =>
    window.heap.load(apiKey, { disableTextCapture: true }),

  identify: (userId) => window.heap.identify(userId),

  logEvent: (eventName, eventProperties) =>
    window.heap.track(eventName, eventProperties),

  setUserProperties: (_userId, userProperties) =>
    window.heap.addUserProperties(userProperties),

  unidentify: () => window.heap.resetIdentity(),

  logPage: (pageName, eventProperties) =>
    window.heap.track("page", { ...eventProperties, pageName }),

  revenue: (amount, eventProperties) =>
    window.heap.track("revenue", { ...eventProperties, revenue: amount }),
};

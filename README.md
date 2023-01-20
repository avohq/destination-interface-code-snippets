# Avo Codegen destination interface code snippets

Jump-start your Avo Codegen implementation with ready-to-use destination interface code-snippets.

This repo contains a collection of destination interfaces for specific programming language, platform and destination combinations that you can pass into your `initAvo` call. For more info on how to use the destination interfaces, take a look at our documentation: https://www.avo.app/docs/implementation/destinations

## How to use this repo

Find the folder with the programming language that you're implementing in (for example _typescript_), then the platform (for example _web_) and finally the destination (could be _mixpanel.ts_). You can copy-paste the destination snippet right into your own project and pass it into your `initAvo` call. 

## Don't find your specific programming language/platform/destination combo?

Our [Destinations in Avo Codegen documentation](https://www.avo.app/docs/implementation/destinations) provides an extensive guide on how to implement your own destination interface. Even if your specific combination doesn't exist, you might be able to use an adjacent destination interface as inspiration. If you hit any blockers or things aren't working, you can always reach out to us via the chat bubble on Avo.app or via [hi@avo.app](email:hi@avo.app) and we'll do our get you going.

If you've found this library helpful and have built you own destination interface that wasn't available previously we'd love add it so that it may aid other developers. You can fork the project, create a new file under the relevant programming language and  simply drop your destination interface into the correct. We'll do our best to quickly review any PR's that come in. Thanks!

## Copied a destination interface and it doesn't work as expected?

If you've tried to use a destination interface for your programming language/platform/destination and it doesn't work as expected, don't hesitate to open up an issue right on this repo or send us an email at [hi@avo.app](email:hi@avo.app). We're monitoring programming languages changes and official SDK's updates but sometimes they get ahead of us. If you've already implemented a fix, we love to review PR's. 🥑
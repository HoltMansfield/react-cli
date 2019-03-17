/messages/messages.json

There are different kinds of messages in this file.


1) Programatic errors.  Example: api calls

Developers create a dolMessage object with messageId and defaultMessage.
Then they update messages.json by hand.  They then run: npm run generate-translations

2) keys that are needed for components we pull in through
npm packages such as our 404 and error pages.

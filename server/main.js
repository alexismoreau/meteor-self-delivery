import { Meteor } from 'meteor/meteor';

const distance = require('google-distance');

Meteor.startup(() => {
  // code to run on server at startup

});

distance.get(
  {
    origin: 'San Francisco, CA',
    destination: 'San Diego, CA'
  },
  (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  }
);

This is a Meteor based project 

The directory imports contains databases (collections).

On the client side, we check every 5 minuts if a journey is finished.

The journey creation is handled by trajet.js on the server side, with 
a synchronous call to google distance API.

We can create trucks as our wishes.
We can not delete a truck if a journey is on going.

# Requirement:
- npm
- meteor

To install meteor :
```
curl https://install.meteor.com | /bin/sh;
```

# Install
```
npm install; meteor
```

# Run Unit Tests
```
meteor test --driver-package=practicalmeteor:mocha
```

# Enjoy
browse to http://localhost:3000
Create an account and start your first autonomous truck company !


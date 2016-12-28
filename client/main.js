import {Accounts} from 'meteor/meteor';
// import './main.html';
// in xo rules: "import/no-unassigned-import": [0, {"ignore": ["./main.html"]}],

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

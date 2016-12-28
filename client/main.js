import { Accounts } from 'meteor/meteor';
import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

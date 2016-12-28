/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import Flottes from '../../imports/flottes';

Meteor.publish('flottes', () => {
  return Flottes.find();
});

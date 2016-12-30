/**
 * Created by alexis_moreau on 28/12/2016.
 */
import {Meteor} from 'meteor/meteor';
import Trajets from '../../imports/trajets';

Meteor.publish('trajets', () => {
  return Trajets.find();
});

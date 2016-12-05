/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Meteor } from 'meteor/meteor';

import Flottes from '../../imports/flottes';

Meteor.subscribe('flottes', function() {
  const camionList = Flottes.find().fetch();
  console.log(camionList);
});

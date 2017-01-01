/**
 * Created by alexis_moreau on 31/12/2016.
 */
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Trajets from '../../imports/trajets';

Template.trajet.events({
  'click #avancement'() {
    Meteor.call('dateFin', this._id, (err, res) => {
      if (err) console.log(err);
      else if (res < Date.now()) {
        console.log('trajet terminé');
        Meteor.call('terminerTrajet', this._id);
      }
      else {
        console.log('il reste ' + (res - Date.now())/1000  + ' secondes de trajet');
      }
    });
  }
});
/*
const minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 minutes check");
  Meteor.call('dateFin', this._id, (err, res) => {
    if (err) console.log(err);
    else if (res < Date.now()) {
      console.log('trajet terminé');
      Meteor.call('terminerTrajet', this._id);
    }
  });
  // do your stuff here
}, the_interval);
*/

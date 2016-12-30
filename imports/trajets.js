/**
 * Created by alexis_moreau on 28/12/2016.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Trajets = new Mongo.Collection('trajets');

Meteor.methods({
  insererTrajet(_id, depart, arrivee) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    Trajets.insert({
      idFlotte: _id,
      origine: depart,
      destination: arrivee,
      dateDepart: Date.now(),
      annule: false
    });
  }
});

export default Trajets;

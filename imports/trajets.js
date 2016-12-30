/**
 * Created by alexis_moreau on 28/12/2016.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Trajets = new Mongo.Collection('trajets');

Meteor.methods({
  afficherListeTrajets() {
    return Trajets.find().fetch();
  },
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
  } /*
  dateDepart(trajet_id) {
    return Trajets.findOne({trajet_id}).dateDepart;
  },
  departTrajet(trajet_id) {
    return Trajets.findOne({trajet_id}).depart;
  },
  destinationTrajet(trajet_id) {
    return Trajets.findOne({trajet_id}).destination;
  },
  annulerTrajet(trajet_id) {
    Trajets.update({trajet_id}, {$set: {annule: true}});
  } */
});

export default Trajets;

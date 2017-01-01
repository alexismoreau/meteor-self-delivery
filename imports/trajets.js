/**
 * Created by alexis_moreau on 28/12/2016.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Trajets = new Mongo.Collection('trajets');

Meteor.methods({
  insererTrajet(_id, depart, destinationIntermediaire, duree, destinationFinale) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    Trajets.insert({
      idFlotte: _id,
      createdBy: this.userId,
      origine: depart,
      destinationIntermediaire: destinationIntermediaire,
      destinationFinale: destinationFinale,
      dateDepart: Date.now(),
      dateFin: (parseInt(Date.now())+parseInt(duree*1000)),
      termine: false
    });
  },
  dateFin(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    return Trajets.findOne({_id}).dateFin;
  },
  destinationIntermediaire(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    return Trajets.findOne({_id}).destinationIntermediaire;
  },
  destinationFinale(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    return Trajets.findOne({_id}).destinationFinale;
  },
  idCamion(_id) {
  if (!this.userId && !Meteor.isTest) {
    throw new Meteor.Error('unauthorized');
  }

  if (!_id) {
    throw new Meteor.Error('invalid id');
  }

  return Trajets.findOne({_id}).idFlotte;
},
  terminerTrajet(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    Trajets.update({_id}, {$set: {termine: true}});
  }
});

export default Trajets;

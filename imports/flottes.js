/**
 * Created by alexis_moreau on 30/11/2016.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Flottes = new Mongo.Collection('flottes');

Meteor.methods({
  localisationCamion(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    return Flottes.findOne({_id}).localisation;
  },
  disponibiliteCamion(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    return Flottes.findOne({_id}).dispo;
  },
  insererCamion() {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    Flottes.insert({
      localisation: 'Paris, FR', // Paris par default
      dispo: true, // dispo par defaut
      createdBy: this.userId, // proprietaire
      createdAt: Date.now() // date de creation
    });
  },
  supprimerCamion(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.remove({_id});
  },
  activerCamion(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({_id}, {$set: {dispo: true}});
  },
  desactiverCamion(_id) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({_id}, {$set: {dispo: false}});
  },
  changerLocalisationCamion(_id, nouvelleLocalisation) {
    if (!this.userId && !Meteor.isTest) {
      throw new Meteor.Error('unauthorized');
    }

    if (!_id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({_id}, {$set: {localisation: nouvelleLocalisation}});
  }
});

export default Flottes;

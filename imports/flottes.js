/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Flottes = new Mongo.Collection('flottes');

Meteor.methods({
  AfficherListeCamions() {
    console.log(Flottes.find().fetch());
  },
  LocalisationCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    console.log(Flottes.findOne({ id }).localisation);
  },

  DisponibiliteCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    console.log(Flottes.findOne({ id }).dispo);
  },
  FinTrajet(id) {
    Meteor.call('DesactiverCamion', id);
  },
  InsererCamion(camion) {
    //  if(!this.userId) {                    ATTENTE AUTHENTIFICATION
    //    console.log('ici');
    //    throw new Meteor.Error('unauthorized');
    //  }

    const listeCamions = Flottes.find().fetch().push(camion);

    Flottes.insert({
      id: listeCamions,
      localisation: 'Paris, FR', // Paris par default
      dispo: true, // dispo par defaut
      createdBy: this.userId, // proprietaire
      createdAt: Date.now() // date de creation
    });
  },
  SupprimerCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.remove({ id });
  },
  ActiverCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({ id }, { $set: { dispo: true } });
  },
  DesactiverCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({ id }, { $set: { dispo: false } });
  }
});

export default Flottes;

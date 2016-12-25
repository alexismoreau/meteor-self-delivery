/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Flottes = new Mongo.Collection('flottes');

Meteor.methods({
  afficherListeCamions() {
    return Flottes.find().fetch();
  },
  localisationCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    return Flottes.findOne({ id }).localisation;
  },
  disponibiliteCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    return Flottes.findOne({ id }).dispo;
  },
  insererCamion(camion) {
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
  supprimerCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.remove({ id });
  },
  activerCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({ id }, { $set: { dispo: true } });
  },
  desactiverCamion(id) {
    //  if (!this.userId) {                    ATTENTE AUTHENTIFICATION
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.update({ id }, { $set: { dispo: false } });
  },
  changerLocalisationCamion(id, nouvelleLocalisation) {
    Flottes.update({ id }, { $set: { localisation: nouvelleLocalisation } });
  }
});

export default Flottes;

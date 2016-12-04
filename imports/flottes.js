/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Flottes = new Mongo.Collection('flottes');

let currentId = 1; // debut du compte des id camions

Meteor.methods({
  AfficherListeCamions() {
    console.log(Flottes.find().fetch());
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

const cametar = Object.create({}, { // creation camion avec id partant de 1
  id: { value: currentId++ }
});

console.log('avant insertion');
Meteor.call('AfficherListeCamions');

Meteor.call('InsererCamion', cametar); // inserer un camion dans la flotte
console.log('apres insertion');
Meteor.call('AfficherListeCamions');

Meteor.call('DesactiverCamion', 1); // desactiver un camion precis
console.log('apres desactivation');
Meteor.call('AfficherListeCamions');

Meteor.call('ActiverCamion', 1); // activer un camion precis
console.log('apres activation');
Meteor.call('AfficherListeCamions');

Meteor.call('SupprimerCamion', 1); // supprimer un camion precis
console.log('apres suppression');
Meteor.call('AfficherListeCamions');

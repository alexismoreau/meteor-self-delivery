/**
 * Created by alexis_moreau on 30/11/2016.
 */
import { Random } from 'meteor/random';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Flottes = new Mongo.Collection('flottes');

// let camionList = [];

const camion = {
  id: Random.id()
};

Meteor.methods({
  InsererCamion(camion) {
    //  if(!this.userId) {                    ATTENTE AUTHENTIFICATION
    //    console.log('ici');
    //    throw new Meteor.Error('unauthorized');
    //  }
    const camionList = Flottes.find().fetch().push(camion);

    Flottes.insert({
      camions: camionList,
      localisation: 'Paris, FR',
      dispo: true, // dispo par defaut
      createdBy: this.userId,
      createdAt: Date.now()
    });
  },

  SupprimerCamion(id) {
    //  if (!this.userId) {
    //  throw new Meteor.Error('unauthorized');
    //  }

    if (!id) {
      throw new Meteor.Error('invalid id');
    }

    Flottes.remove({
      // _id: id,
      camions: id,
      createdBy: this.userId
    });
  }
});

export default Flottes;

/*
for (i in Flottes.find().fetch()) {
  console.log(Flottes.find().fetch()[i].camions);
}
*/

const cametar = Object.create(camion);

// Meteor.call('InsererCamion', cametar); // inserer un camion dans la flotte

const camionList = Flottes.find().fetch(); // liste des camions dans la flotte

// Meteor.call('SupprimerCamion', 4); // supprimer un camion precis

console.log(camionList);

/**
 * Created by alexis_moreau on 28/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import Flottes from '../imports/flottes';

import { resetDatabase } from 'meteor/xolvio:cleaner';
resetDatabase(); // just for dev

const distance = require('google-distance');
const Future = require('fibers/future');

Meteor.methods({
  trajet(dep, arr) {
    const future = new Future();
    distance.get(
      {
        origin: dep,
        destination: arr
      },
      (err, data) => {
        if (err) {
          future.return(console.log(err));
        }
        future.return(data.durationValue);
      }
    );
    return future.wait();
  },
  demandeTrajet(id, depart, arrivee) {
    let localisation = Meteor.call('localisationCamion', id);
    if (Meteor.call('disponibiliteCamion', id)) {
      if (depart !== localisation) {
        Meteor.call('desactiverCamion', id);

        console.log('Flotte située à ' + localisation +
          '. Envoi à ' + depart);

        const delai1 = Meteor.call('trajet', localisation, depart);

        console.log('de ' + localisation + ' à ' + depart + ' il y a ' + delai1
          + ' secondes de trajet');

        Meteor.call('changerLocalisationCamion', id, depart); // ajouter timeout

        localisation = Meteor.call('localisationCamion', id);

        console.log('Flotte située à ' + localisation +
          '. Envoi à ' + arrivee);

        const delai2 = Meteor.call('trajet', localisation, arrivee);

        console.log('de ' + localisation + ' à ' + arrivee + ' il y a ' + delai2
          + ' secondes de trajet');

        Meteor.call('changerLocalisationCamion', id, depart); // ajouter timeout

        console.log('flotte arrivée à bon port à ' +
          '' + Meteor.call('localisationCamion', id));

        Meteor.call('activerCamion', id);

      } else if (depart === localisation) {
        Meteor.call('desactiverCamion', id);

        console.log('Flotte située à ' + localisation +
          '. Envoi à : ' + arrivee);

        Meteor.call('trajet', id, localisation, arrivee);

        console.log('flotte arrivée à ' + Meteor.call('localisationCamion', id));

        Meteor.call('activerCamion', id);
      }
    } else {
      console.log('flotte non disponible');
    }
  }
});

/*
 Flotte située à Paris mais trajet de Strasbourg à Marseille
 */
let currentId = 1; // debut du compte des id camions

const cametar = Object.create({}, { // creation camion avec id partant de 1
  id: {value: currentId++}
});

Meteor.call('insererCamion', cametar); // inserer un camion dans la flotte
console.log(Meteor.call('afficherListeCamions'));

Meteor.call('demandeTrajet', 1, 'Brest, FR', 'Marseille, FR');

console.log(Meteor.call('afficherListeCamions'));




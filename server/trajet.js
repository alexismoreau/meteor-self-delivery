/**
 * Created by alexis_moreau on 28/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';

resetDatabase(); // just for dev

const distance = require('google-distance');
const Future = require('fibers/future');

Meteor.methods({
  calculDureeTrajet(dep, arr) {
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
  trajet(id, depart, arrivee) {
    console.log('Flotte ' + id + ' située à ' + depart +
      '. Envoi à ' + arrivee);

    const delai = Meteor.call('calculDureeTrajet', depart, arrivee);

    console.log('De ' + depart + ' à ' + arrivee + ' il y a ' + delai +
      ' secondes de trajet');

    Meteor.call('changerLocalisationCamion', id, arrivee);

    depart = Meteor.call('localisationCamion', id);

    console.log('Flotte ' + id + ' arrivée à ' + depart);
  },
  demandeTrajet(id, depart, arrivee) {
    const localisation = Meteor.call('localisationCamion', id);
    if (Meteor.call('disponibiliteCamion', id)) {
      if (depart !== localisation) {
        Meteor.call('desactiverCamion', id);

        Meteor.call('trajet', id, localisation, depart);

        Meteor.call('trajet', id, depart, arrivee);

        Meteor.call('activerCamion', id);
      } else if (depart === localisation) {
        Meteor.call('desactiverCamion', id);

        Meteor.call('trajet', id, depart, arrivee);

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
  id: { value: currentId++ }
});

Meteor.call('insererCamion', cametar); // inserer un camion dans la flotte

console.log(Meteor.call('afficherListeCamions'));

Meteor.call('demandeTrajet', 1, 'Brest, FR', 'Marseille, FR');
Meteor.call('demandeTrajet', 1, 'Marseille, FR', 'Paris, FR');

console.log(Meteor.call('afficherListeCamions'));

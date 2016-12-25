/**
 * Created by alexis_moreau on 28/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import Flottes from '../imports/flottes';

const distance = require('google-distance');

Meteor.methods({
  trajet(id, dep, arr) {
    distance.get(
      {
        origin: dep,
        destination: arr
      },
      Meteor.bindEnvironment((err, data) => {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      })
    );
    Meteor.call('changerLocalisationCamion', id, arr);
  },
  demandeTrajet(id, depart, arrivee) {
    const localisation = Meteor.call('localisationCamion', id);
    if (Meteor.call('disponibiliteCamion', id)) {
      if (depart !== localisation) {
        Meteor.call('desactiverCamion', id);

        console.log('Flotte située à ' + localisation +
          '. Envoi à ' + depart);

        Meteor.call('trajet', id, localisation, depart);

        console.log('Flotte située à ' + Meteor.call('localisationCamion', id) +
          '. Envoi à ' + arrivee);

        Meteor.call('trajet', id, Meteor.call('localisationCamion', id)
          , arrivee);

        console.log('flotte arrivée à bon port à ' +
          ''+ Meteor.call('localisationCamion', id));

        Meteor.call('activerCamion', id);
      } else if (depart === localisation) {
        Meteor.call('desactiverCamion', id);

        console.log('Flotte située à ' + localisation +
          '. Envoi à ' + arrivee);

        Meteor.call('trajet', id, localisation, arrivee);

        console.log('flotte arrivée à '+ Meteor.call('localisationCamion', id));

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

// Meteor.call('demandeTrajet', 1, 'Paris, FR', 'Marseille, FR');


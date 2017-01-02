/**
 * Created by alexis_moreau on 28/11/2016.
 */
import {Meteor} from 'meteor/meteor';

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
  trajet(_id, depart, destinationIntermediaire, destinationFinale) {
    if (depart === destinationIntermediaire) {
      const delai = Meteor.call('calculDureeTrajet', depart, destinationFinale);
      console.log('De ' + depart + ' à ' + destinationFinale + ' il y a ' +
        delai + ' secondes de trajet.');
      Meteor.call('insererTrajet', _id, depart, '', delai, destinationFinale);
    } else {
      const delai1 = Meteor.call('calculDureeTrajet', depart,
        destinationIntermediaire);
      const delai2 = Meteor.call('calculDureeTrajet',
        destinationIntermediaire, destinationFinale);
      const delaiTotal = (delai1 + delai2);
      console.log('De ' + depart + ' à ' + destinationIntermediaire +
        ' il y a ' + delai1 +
        ' secondes de trajet. Destination finale: ' + destinationFinale +
        ', il y aura ' + delai2 + ' de temps de trajet supplémentaire. ');
      console.log('Temps total: ' + delaiTotal + ' secondes.');
      Meteor.call('insererTrajet', _id, depart, destinationIntermediaire,
        delaiTotal, destinationFinale);
    }
  },
  demandeTrajet(_id, depart, arrivee) {
    const localisation = Meteor.call('localisationCamion', _id);
    if (Meteor.call('disponibiliteCamion', _id)) {
      if (depart === arrivee) {
        console.log('depart et arrivee identiques');
      } else {
        Meteor.call('desactiverCamion', _id);

        Meteor.call('trajet', _id, localisation, depart, arrivee);
      }
    } else {
      console.log('flotte non disponible');
    }
  }
});

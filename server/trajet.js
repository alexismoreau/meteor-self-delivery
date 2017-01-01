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
  trajet(_id, depart, arrivee) {
    const delai = Meteor.call('calculDureeTrajet', depart, arrivee);

    console.log('De ' + depart + ' à ' + arrivee + ' il y a ' + delai +
      ' secondes de trajet');

    Meteor.call('insererTrajet', _id, depart, arrivee, delai);

    Meteor.call('changerLocalisationCamion', _id, arrivee);

    depart = Meteor.call('localisationCamion', _id);
  },
  demandeTrajet(_id, depart, arrivee) {
    const localisation = Meteor.call('localisationCamion', _id);
    if (Meteor.call('disponibiliteCamion', _id)) {
      if (depart !== localisation) {
        Meteor.call('desactiverCamion', _id);

        Meteor.call('trajet', _id, localisation, depart);

        Meteor.call('trajet', _id, depart, arrivee);

        Meteor.call('activerCamion', _id);
      } else if (depart === localisation) {
        Meteor.call('desactiverCamion', _id);

        Meteor.call('trajet', _id, depart, arrivee);

        Meteor.call('activerCamion', _id);
      } else if (depart === arrivee) {
        console.log('depart et arrivee identique');
      }
    } else {
      console.log('flotte non disponible');
    }
  }
});

/*
 const delai = 200;
 let i;
 let avancement;
 for (i = 0; i < delai; i++) {
 avancement = Math.round((i / delai) * 100);
 console.log(avancement + '%');
 }
 */

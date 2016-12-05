/**
 * Created by alexis_moreau on 28/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import Flottes from '../imports/flottes';

const distance = require('google-distance');

Meteor.methods({
  callDistanceAPI(camion, dep, arr) {
    distance.get(
      {
        origin: dep,
        destination: arr
      },
      Meteor.bindEnvironment((err, data) => {
        if (err) {
          return console.log(err);
        }
        Flottes.update({_id : this.userId},{$set:{dispo: false}});
        console.log(data);
        Flottes.update({_id : this.userId},{$set:{localisation: arr}});
        console.log('flotte située à ' + Meteor.call('getLocation') +
          ' depuis ' + dep);
        Meteor.call('demandeTrajet', Meteor.call('getLocation'), arrivee);
        Flottes.update({_id : this.userId},{$set:{dispo: true}});
        // flotte disponible seulement à la fin du trajet
      })
    );
  },
  demandeTrajet(depart, arrivee) {
    if (Meteor.call('isDisponible')) {
      if (depart !== Meteor.call('getLocation')) {
        console.log('Flotte située à ' + Meteor.call('getLocation') +
          '. Envoi à ' + depart);
        Meteor.call('callDistanceAPI', Meteor.call('getLocation'), depart);
      } else if (arrivee === Meteor.call('getLocation')) {
        console.log('flotte arrivée à bon port à '
          + Meteor.call('getLocation'));
        Meteor.call('FinTrajet');
      } else {
        Meteor.call('callDistanceAPI', depart, arrivee);
      }
    } else {
      console.log('flotte non disponible');
    }
  }
});

 /*
 Flotte située à Paris mais trajet de Strasbourg à Marseille
 */

let depart = 'Strasbourg, FR';
let arrivee = 'Marseille, FR';
// Meteor.call('demandeTrajet', depart, arrivee);

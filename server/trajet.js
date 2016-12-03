/**
 * Created by alexis_moreau on 28/11/2016.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Flottes from '../imports/flottes';

const distance = require('google-distance');

const camionList = Flottes.find().fetch()[i]; // ajouter id

Meteor.methods({
  getLocation() {
    return camionList.localisation;
  },
  isDisponible() {
    return camionList.dispo;
  },
  callDistanceAPI(dep, arr) {
    distance.get(
      {
        origin: dep,
        destination: arr
      },
      Meteor.bindEnvironment((err, data) => {
        if (err) {
          return console.log(err);
        }
        camionList.dispo = false;
        console.log(data);
        camionList.localisation = arr;
        console.log('flotte située à ' + localisation +
          ' depuis ' + dep);
        Meteor.call('demandeTrajet', localisation, arrivee);
        camionList.dispo = true; // flotte disponible seulement à la fin
                                 // du trajet
      }));
  },
  demandeTrajet(depart, arrivee) {
    if (Meteor.call('isDisponible')) {
      if (depart !== Meteor.call('getLocation')) {
        console.log('Flotte située à ' + camionList.localisation +
          '. Envoi à ' + depart);
        Meteor.call('callDistanceAPI', camionList.localisation, depart);
      } else if (arrivee === localisation) {
        console.log('flotte arrivée à bon port à ' + camionList.localisation);
        camionList.dispo = true;
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
Meteor.call('demandeTrajet', depart, arrivee);

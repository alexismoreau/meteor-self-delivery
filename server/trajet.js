/**
 * Created by alexis_moreau on 28/11/2016.
 */
const distance = require('google-distance');

let localisation = 'Paris, FR';
let dispo = true; // flotte disponible par default

Meteor.methods({
  location () {
    return localisation;
  },
  disponible () {
    return dispo;
  },
  callDistanceAPI (dep, arr) {
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
          localisation = arr;
          console.log('flotte située à ' + localisation + " depuis " + dep);
          Meteor.call('demande_trajet', localisation, arrivee);
        }
      ));
  },
  demande_trajet(depart, arrivee) {
    if (Meteor.call('disponible')) {
      if (depart !== Meteor.call('location')) {
        console.log("Flotte située à " + localisation + ". Envoi à " + depart);
        Meteor.call('callDistanceAPI', localisation, depart);
      }
      else if (arrivee === localisation) {
        console.log('flotte arrivée à bon port à ' + localisation);
      }
      else {
        Meteor.call('callDistanceAPI', depart, arrivee);
      }
    }
    else {
      console.log('flotte non disponible');
    }
  }
});

/*
 Flotte située à Paris mais trajet de Strasbourg à Marseille
 */

let depart = 'Strasbourg, FR';
let arrivee = 'Marseille, FR';
var testDemandetrajet = Meteor.call('demande_trajet', depart, arrivee);
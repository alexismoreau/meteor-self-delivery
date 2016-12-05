import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
/*
let currentId = 1; // debut du compte des id camions

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

console.log('affiche localisation camion');
Meteor.call('LocalisationCamion', 1);
Meteor.call('AfficherListeCamions');

console.log('affiche disponibilite camion');
Meteor.call('DisponibiliteCamion', 1);
Meteor.call('AfficherListeCamions');

Meteor.call('SupprimerCamion', 1); // supprimer un camion precis
console.log('apres suppression');
Meteor.call('AfficherListeCamions');
*/

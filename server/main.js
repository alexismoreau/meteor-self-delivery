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
console.log(Meteor.call('afficherListeCamions'));

Meteor.call('insererCamion', cametar); // inserer un camion dans la flotte
console.log('apres insertion');

console.log(Meteor.call('afficherListeCamions'));

Meteor.call('desactiverCamion', 1); // desactiver un camion precis
console.log('apres desactivation');
console.log(Meteor.call('disponibiliteCamion', 1));

Meteor.call('activerCamion', 1); // activer un camion precis
console.log('apres activation');
console.log(Meteor.call('disponibiliteCamion', 1));

console.log('affiche localisation camion');
console.log(Meteor.call('localisationCamion', 1));

Meteor.call('supprimerCamion', 1); // supprimer un camion precis
console.log('apres suppression');

console.log(Meteor.call('afficherListeCamions'));
*/

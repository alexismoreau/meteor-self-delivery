/**
 * Created by alexis_moreau on 31/12/2016.
 */
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Trajets from '../../imports/trajets';

Template.trajet.events({
  'click #avancement'() {
    Meteor.call('dateFin', this._id, (err, dateFin) => {
      if (err) {
        document.getElementById("reponse" ).innerHTML = err;
      } else if (dateFin < Date.now()) {
        document.getElementById("reponse" ).innerHTML = 'trajet terminé';
        const arrivee = Meteor.call('destinationFinale', this._id);
        const idCamion = Meteor.call('idCamion', this._id);
        Meteor.call('changerLocalisationCamion', idCamion, arrivee);
        Meteor.call('activerCamion', idCamion);
        Meteor.call('terminerTrajet', this._id);
      } else {
        ms = dateFin - Date.now();
        s = ms / 1000;
        min = s / 60;
        min2 = min% 60;
        sec = s % 60;
        h = min / 60;
        document.getElementById("reponse" ).innerHTML = ('il reste ' + Math.floor(h)
        + ' heure(s) ' + Math.floor(min2) + ' minute(s) ' + Math.floor(sec)  +
        ' seconde(s) de trajet');
      }
    });
  }
});

const interval = 5 * 60 * 1000; // 5 minutes
Meteor.setInterval(() => {
  document.getElementById("reponse" ).innerHTML = 'Verification toutes les 5 minutes';
  let i;
  for (i = 0; i < Trajets.find().fetch().length; i++) {
    const idTrajet = Trajets.find().fetch()[i]._id;
    Meteor.call('dateFin', idTrajet, (err, dateFin) => {
      if (err) {
        console.log(err);
      } else if (dateFin < Date.now()) {
        document.getElementById("reponse" ).innerHTML = 'trajet terminé';
        Meteor.call('destinationFinale', idTrajet, (err, arrivee) => {
          if (err) {
            console.log(err);
          }
          Meteor.call('idCamion', idTrajet, (err, idCamion) => {
            if (err) {
              document.getElementById("reponse" ).innerHTML = err;
            }
            Meteor.call('changerLocalisationCamion', idCamion, arrivee);
            Meteor.call('activerCamion', idCamion);
            Meteor.call('terminerTrajet', idTrajet);
          });
        });
      } else {
        ms = dateFin - Date.now();
        s = ms / 1000;
        min = s / 60;
        min2 = min% 60;
        sec = s % 60;
        h = min / 60;
        document.getElementById("reponse" ).innerHTML = ('vérif : il reste ' + Math.floor(h)
        + ' heure(s) ' + Math.floor(min2) + ' minute(s) ' + Math.floor(sec)  +
        ' seconde(s) de trajet');
      }
    });
  }
}, interval);

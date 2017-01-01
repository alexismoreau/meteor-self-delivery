/**
 * Created by alexis_moreau on 31/12/2016.
 */
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Trajets from '../../imports/trajets';

Template.trajet.events({
  'click #avancement'() {
    Meteor.call('dateFin', this._id, (err, res) => {
      if (err) console.log(err);
      else if (res < Date.now()) {
        console.log('trajet terminé');
        const arrivee = Meteor.call('destinationFinale', this._id);
        const idCamion = Meteor.call('idCamion', this._id);
        Meteor.call('changerLocalisationCamion', idCamion, arrivee);
        Meteor.call('activerCamion', idCamion);
        Meteor.call('terminerTrajet', this._id);
      }
      else {
        console.log('il reste ' + (res - Date.now()) / 1000 + ' secondes de trajet');
      }
    });
  }
});

const minutes = 5, interval = minutes * 60 * 1000;
Meteor.setInterval(() => {
  console.log("Verification toutes les 5 minutes");
  let i;
  for (i = 0; i < Trajets.find().fetch().length; i++) {
    const idTrajet = Trajets.find().fetch()[i]._id;
    Meteor.call('dateFin', idTrajet, (err, dateFin) => {
      if (err) console.log(err);
      else if (dateFin < Date.now()) {
        console.log('trajet terminé');
        Meteor.call('destinationFinale', idTrajet, (err, arrivee) => {
          console.log(arrivee);
          Meteor.call('idCamion', idTrajet, (err, idCamion) => {
            console.log(idCamion);
            Meteor.call('changerLocalisationCamion', idCamion, arrivee);
            Meteor.call('activerCamion', idCamion);
            Meteor.call('terminerTrajet', idTrajet);
          });
        });
      } else {
        console.log('verif: il reste ' + (dateFin - Date.now()) / 1000 + ' secondes de trajet');
      }
    });
  }
}, interval);

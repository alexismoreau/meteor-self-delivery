/**
 * Created by alexis_moreau on 29/12/2016.
 */
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.camion.events({
  'click #delete'() {
    Meteor.call('disponibiliteCamion', this._id, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res === true) {
        Meteor.call('supprimerCamion', this._id);
      } else {
        console.log('impossible de supprimer un camion non disponible');
      }
    });
  }
});

Template.demanderTrajet.events({
  'submit form'(event) {
    event.preventDefault();
    const origine = event.target.Depart.value;
    const destination = event.target.Destination.value;
    Meteor.call('disponibiliteCamion', this._id, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res === true) {
        if (origine === destination) {
          console.log('depart et destination identiques');
        } else {
          Meteor.call('demandeTrajet', this._id, origine, destination);
          Meteor.call('changerLocalisationCamion', this._id, "Trajet en cours");
        }
      } else {
        console.log('flotte non disponible');
      }
    });
  }
});

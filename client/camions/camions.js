/**
 * Created by alexis_moreau on 29/12/2016.
 */
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Flottes from '../../imports/flottes';

Template.dashboard.helpers({
  camions() {
    // retourne liste des camions pour chaque utilisateur
    const currentUserId = Meteor.userId();
    return Flottes.find({createdBy: currentUserId});
  }
});

Template.dashboard.events({
  'click #create'() {
    Meteor.call('insererCamion');
  }
});

Template.camion.events({
  'click #select'() {
    // click on a truck to select it
    Session.set('selectedFlotte', this._id);
    console.log(Session.get('selectedFlotte'));
  },
  'click #enable'() {
    Meteor.call('activerCamion', this._id);
  },
  'click #disable'() {
    Meteor.call('desactiverCamion', this._id);
  },
  'click #delete'() {
    Meteor.call('supprimerCamion', this._id);
  }
});

Template.demanderTrajet.events({
  'submit form'(event) {
    event.preventDefault();
    const origine = event.target.Depart.value;
    const destination = event.target.Destination.value;
    if (origine === destination) {
      console.log('depart et destination identiques');
    } else {
      Meteor.call('demandeTrajet', this._id, origine, destination);
    }
  }
});
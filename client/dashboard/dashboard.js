/**
 * Created by alexis_moreau on 31/12/2016.
 */
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Flottes from '../../imports/flottes';
import Trajets from '../../imports/trajets';

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
  },
  'submit #bulk-create'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const valeur = event.target.text.value;

    if (valeur < 0) {
      return false;
    }

    let i;
    for (i = 0; i < valeur; i++) {
      Meteor.call('insererCamion');
    }
    // Clear form
    event.target.text.value = '';
  }
});

Template.dashboard.helpers({
  trajets() {
    // retourne liste des trajets pour chaque utilisateur
    const currentUserId = Meteor.userId();
    return Trajets.find({createdBy: currentUserId});
  }
});

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
  }
});

Template.dashboard.helpers({
  trajets() {
    // retourne liste des trajets pour chaque utilisateur
    const currentUserId = Meteor.userId();
    return Trajets.find({createdBy: currentUserId});
  }
});
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Flottes from '../../imports/flottes';

Template.supprimerCamions.helpers({
  cam() {
    // retourne liste des camions pour chaque utilisateur
    const currentUserId = Meteor.userId();
    return Flottes.find({createdBy: currentUserId});
  }
});

Template.supprimerCamions.onRendered(function () {
  this.$('.ui.fluid.dropdown').dropdown();
});

Template.supprimerCamions.events({
  'submit deleteManyForm'(event) {
    event.preventDefault();
    console.log(event);
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
  },
  'click button#bulk-delete'(event) {
    event.preventDefault();
    let i;
    const values = $('#idCamions').val();
    for (i = 0; i < values.length; i++) {
      Meteor.call('supprimerCamion', values[i]);
    }
  }
});


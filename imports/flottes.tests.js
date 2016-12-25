// meteor test --driver-package=practicalmeteor:mocha
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import Flottes from '../imports/flottes';

import { resetDatabase } from 'meteor/xolvio:cleaner';
import { describe, it } from "meteor/practicalmeteor:mocha"
import { expect, should } from "meteor/practicalmeteor:chai"

if (Meteor.isServer) {
  describe("Fonctions relatives au Camions (modele)", function () {
    resetDatabase();
    it("insererCamion: liste des camions ne doit pas " +
      "être nulle", function (done) {
      let currentId = 1;
      const cametar = Object.create({}, {
        id: { value: currentId++ }
      });
      Meteor.call('insererCamion', cametar);
      expect(Flottes.find().fetch().length).to.not.equal(0);
      done();
    });
    it("localisationCamion: doit retourner une string", function (done) {
      expect(Meteor.call('localisationCamion', 1)).to.be.a('string');
      done();
    });
    it("disponibiliteCamion: doit retourner un booleen", function (done) {
      expect(Meteor.call('disponibiliteCamion', 1)).to.be.a('boolean');
      done();
    });
    it("activerCamion: dispo retourne true", function (done) {
      Meteor.call('activerCamion', 1);
      expect(Meteor.call('disponibiliteCamion', 1)).to.equal(true);
      done();
    });
    it("desactiverCamion: dispo retourne false", function (done) {
      Meteor.call('desactiverCamion', 1);
      expect(Meteor.call('disponibiliteCamion', 1)).to.equal(false);
      done();
    });
    it("changerLocalisationCamion: localisation retourne la nouvelle" +
      " localisation", function (done) {
      Meteor.call('changerLocalisationCamion', 1, 'Marseille, FR');
      expect(Meteor.call('localisationCamion', 1)).to.equal('Marseille, FR');
      done();
    });
    it('supprimerCamion: liste des camions doit etre vide', function(done) {
      Meteor.call('supprimerCamion', 1);
      expect(Flottes.find().fetch().length).to.equal(0);
      done();
    });
  });
}
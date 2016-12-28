// meteor test --driver-package=practicalmeteor:mocha
import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {describe, it} from 'meteor/practicalmeteor:mocha';
import {expect} from 'meteor/practicalmeteor:chai';
import Flottes from '../imports/flottes';

if (Meteor.isServer) {
  describe('Fonctions relatives au Camions (modele)', () => {
    resetDatabase();
    it('insererCamion: liste des camions ne doit pas ' +
      'être nulle', done => {
      let currentId = 1;
      const cametar = Object.create({}, {
        id: {value: currentId++}
      });
      Meteor.call('insererCamion', cametar);
      expect(Flottes.find().fetch().length).to.not.equal(0);
      done();
    });
    it('localisationCamion: doit retourner une string', done => {
      expect(Meteor.call('localisationCamion', 1)).to.be.a('string');
      done();
    });
    it('disponibiliteCamion: doit retourner un booleen', done => {
      expect(Meteor.call('disponibiliteCamion', 1)).to.be.a('boolean');
      done();
    });
    it('activerCamion: dispo retourne true', done => {
      Meteor.call('activerCamion', 1);
      expect(Meteor.call('disponibiliteCamion', 1)).to.equal(true);
      done();
    });
    it('desactiverCamion: dispo retourne false', done => {
      Meteor.call('desactiverCamion', 1);
      expect(Meteor.call('disponibiliteCamion', 1)).to.equal(false);
      done();
    });
    it('changerLocalisationCamion: localisation retourne la nouvelle' +
      ' localisation', done => {
      Meteor.call('changerLocalisationCamion', 1, 'Marseille, FR');
      expect(Meteor.call('localisationCamion', 1)).to.equal('Marseille, FR');
      done();
    });
    it('supprimerCamion: liste des camions doit etre vide', done => {
      Meteor.call('supprimerCamion', 1);
      expect(Flottes.find().fetch().length).to.equal(0);
      done();
    });
  });
}

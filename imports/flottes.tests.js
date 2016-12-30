// meteor test --driver-package=practicalmeteor:mocha
import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {describe, it} from 'meteor/practicalmeteor:mocha';
import {expect} from 'meteor/practicalmeteor:chai';
import Flottes from '../imports/flottes';

const DDPCommon = Package['ddp-common'].DDPCommon;

if (Meteor.isServer) {
  describe('Fonctions relatives au Camions (modele)', () => {
    resetDatabase();

    const invocation = new DDPCommon.MethodInvocation({
      isSimulation: false,
      userId: 'dbAnEgsK22x5NAghP',
      setUserId: () => {},
      unblock: () => {},
      connection: {},
      randomSeed: Math.random()
    });

    it('insererCamion: liste des camions ne doit pas ' +
      'être nulle', done => {
      DDP._CurrentInvocation.withValue(invocation, () => {
        Meteor.call('insererCamion');
      });
      expect(Flottes.find().fetch().length).to.not.equal(0);
      done();
    });
    it('localisationCamion: doit retourner une string', done => {
      expect(Meteor.call('localisationCamion', Flottes.find().fetch()[0]._id))
        .to.be.a('string');
      done();
    });
    it('disponibiliteCamion: doit retourner un booleen', done => {
      expect(Meteor.call('disponibiliteCamion', Flottes.find().fetch()[0]._id))
        .to.be.a('boolean');
      done();
    });
    it('activerCamion: dispo retourne true', done => {
      Meteor.call('activerCamion', Flottes.find().fetch()[0]._id);
      expect(Meteor.call('disponibiliteCamion', Flottes.find().fetch()[0]._id))
        .to.equal(true);
      done();
    });
    it('desactiverCamion: dispo retourne false', done => {
      Meteor.call('desactiverCamion', Flottes.find().fetch()[0]._id);
      expect(Meteor.call('disponibiliteCamion', Flottes.find().fetch()[0]._id))
        .to.equal(false);
      done();
    });
    it('changerLocalisationCamion: localisation retourne la nouvelle' +
      ' localisation', done => {
      Meteor.call('changerLocalisationCamion', Flottes.find().fetch()[0]._id,
        'Marseille, FR');
      expect(Meteor.call('localisationCamion', Flottes.find().fetch()[0]._id))
        .to.equal('Marseille, FR');
      done();
    });
    it('supprimerCamion: liste des camions doit etre vide', done => {
      Meteor.call('supprimerCamion', Flottes.find().fetch()[0]._id);
      expect(Flottes.find().fetch().length).to.equal(0);
      done();
    });
  });
}

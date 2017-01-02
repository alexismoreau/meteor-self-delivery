/**
 * Created by alexis_moreau on 02/01/2017.
 */
// meteor test --driver-package=practicalmeteor:mocha
import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {describe, it} from 'meteor/practicalmeteor:mocha';
import {expect} from 'meteor/practicalmeteor:chai';
import Trajets from '../imports/trajets';

const DDPCommon = Package['ddp-common'].DDPCommon;

if (Meteor.isServer) {
  describe('Fonctions relatives aux Trajets', () => {
    resetDatabase();

    const invocation = new DDPCommon.MethodInvocation({
      isSimulation: false,
      userId: 'dbAnEgsK22x5NAghP',
      setUserId: () => {},
      unblock: () => {},
      connection: {},
      randomSeed: Math.random()
    });

    it('insererTrajet: liste des trajets ne doit pas ' +
      'être nulle', done => {
      DDP._CurrentInvocation.withValue(invocation, () => {
        Meteor.call('insererTrajet', '8Fd82Zw9pyMsE97yv', 'Paris, FR',
          'Marseille, FR', 25000, 'Nantes, FR');
      });
      expect(Trajets.find().fetch().length).to.not.equal(0);
      done();
    });
    it('dateFin: doit retourner un nombre', done => {
      expect(Meteor.call('dateFin', Trajets.find().fetch()[0]._id))
        .to.be.a('number');
      done();
    });
    it('destinationIntermediaire: doit retourner une string', done => {
      expect(Meteor.call('destinationIntermediaire',
        Trajets.find().fetch()[0]._id)).to.be.a('string');
      done();
    });
    it('destinationFinale: doit retourner une string', done => {
      expect(Meteor.call('destinationFinale', Trajets.find().fetch()[0]._id))
        .to.be.a('string');
      done();
    });
    it('idCamion: idCamion doit returner une string', done => {
      expect(Meteor.call('idCamion', Trajets.find().fetch()[0]._id))
        .to.be.a('string');
      done();
    });
    it('terminerTrajet: terminé retourne true', done => {
      Meteor.call('terminerTrajet', Trajets.find().fetch()[0]._id);
      expect(Meteor.call('trajetTermine', Trajets.find().fetch()[0]._id))
      .to.equal(true);
      done();
    });
  });
}

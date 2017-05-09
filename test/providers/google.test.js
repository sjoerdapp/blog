const mocha = require('mocha');
const config = require('../../lib/config').default;
const { expect } = require('chai');
const google = require('../../lib/providers/google').default;
const factory = require('../../lib/factory/').default;
const authConfig = config.google.auth;

describe('Google', ()=> {
   describe('OAuth', ()=> {
      it('creates client', ()=> {
         expect(google.auth.client).to.exist;
      });

      it('genenerates authorization URL', ()=> {
         const url = google.auth.url();
         expect(url).to.exist;
         expect(url).to.include(authConfig.clientID);
         expect(url).to.include(config.domain);
      });

      it('tests for expired access token', ()=> {
         expect(google.auth.expired()).is.true;
         authConfig.token.accessExpiration = new Date() + 1;
         expect(google.auth.expired()).is.false;
      });

      it('refreshes access token', ()=> {
         authConfig.token.accessExpiration = null;
         return google.auth.verify().then(() => {
            expect(authConfig.token.accessExpiration).to.exist;
            expect(authConfig.token.accessExpiration).is.instanceOf(Date);
         });
      });
   });

   describe('Drive', function() {
      let post = null;
      this.timeout(10000);

      before(() => factory.buildLibrary().then(library => {
         post = library.postWithKey('owyhee-snow-and-sand/lowlands');
         return true;
      }));

      it('retrieve GPX file content', function() {
         this.timeout(10000);
         return google.drive.loadGPX(post).then(gpxText => {
            expect(gpxText).to.exist;
         });
      });
   });
});
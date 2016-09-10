'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;
const e = require('../../lib/constants');
const viewCache = require('../../lib/middleware/view-cache');
const cache = require('../../lib/cache');
const req = require('../mocks/request.mock');
const res = require('../mocks/response.mock');

describe('Output Cache Middleware', ()=> {
	const viewSlug = 'test-slug';
	const pageContent = '<html><head></head><body>Test Page</body></html>';

	// add caching expando methods
	before(done => { viewCache.apply(req, res, done); });

	it.skip('sends already rendered pages from cache', done => {
		res.sendView(viewSlug, render => {
			render('test-template', { option1: 'value1', option2: 'value2' });
			done();
		});
	});

	it('adds caching headers to compressed content', ()=> {
		let item = cache.view.item(viewSlug, pageContent);
		res.sendCompressed(e.mimeType.HTML, item);

		expect(res.headers['Cache-Control']).equals('max-age=86400, public');
		expect(res.headers['ETag']).to.contain(viewSlug);
		expect(res.content).equals(item.buffer);
	});

	// remove test page from cache
	after(done => { res.removeFromCache(viewSlug, ()=> { done(); }); });
});
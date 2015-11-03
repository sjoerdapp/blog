'use strict';

const is = require('../is.js');
const config = require('../config.js');
const log = config.provider.log;

/**
 * Methods for interacting with source data
 */
class DataBase {
	/**
	 * @param {FactoryBase} factory
	 */
	constructor(factory) {
		/**
		 * Provider-specific object field names that store photos sizes
		 */
		this.sizeField = {
			thumb: null,
			preview: null,
			fallbacks: [],
			normal: null,
			big: null
		};
		this.options = {};
		/**
		 * @type {FactoryBase}
		 */
		this.factory = factory;
		/**
		 * Methods for managing model cache
		 */
		this.cache = require('../cache/model-cache.js');
	}

	/**
	 * @returns {Array.<String>}
	 */
	get sizesForPost() {
		return [this.sizeField.preview, this.sizeField.normal, this.sizeField.big].concat(this.sizeField.fallbacks);
	}

	/**
	 * @returns {Array.<String>}
	 */
	get sizesForSearch() {
		return [this.sizeField.thumb];
	}

	/**
	 * Retrieve EXIF data for a photo
	 * @param {String} photoID
	 * @param {function(EXIF)} callback
	 */
	loadExif(photoID, callback) {}

	/**
	 *
	 * @param {String|Post} postOrID
	 * @param {function(Post)} callback
	 */
	loadPost(postOrID, callback) {};

	/**
	 * @param {Post} post
	 * @param {function(Post)} callback
	 */
	loadPostInfo(post, callback) {};

	/**
	 * @param {Post} post
	 * @param {function(Post)} callback
	 */
	loadPostPhotos(post, callback) {};

	/**
	 * Retrieve posts, post tags and photo tags from cache (categories)
	 * @param {function(Library)} callback
	 */
	loadLibrary(callback) {
		this.loadPhotoTags(photoTags => {
			// post parsing depends on having the photo tags
			this.cache.getPosts((data, tree) => {
				if (tree !== null) {
					try {
						let library = this.factory.buildLibrary(tree);
						this._loadAllCachedPosts(library, data);
						library.photoTags = photoTags;
						callback(library);
					} catch (error) {
						log.error('Unable to parse cached library (%s): must reload', error.toString());
						this._loadLibraryFromSource(callback, photoTags);
					}
				} else {
					// remove bad cache data
					//this.cache.clear();
					this._loadLibraryFromSource(callback, photoTags);
				}
			});
		});
	}

	/**
	 * Asynchronously load details for all posts in library
	 * @param {Library} library
	 */
	loadAllPosts(library) {
		let pending = library.posts.length;

		for (let p of library.posts) {
			// begin an async call for each post
			this.loadPostInfo(p, post => {
				if (post === null) {
					// if no post info was found then assume post doesn't belong in library
					log.warn('Removing post %s from library', p.id);
					this.cache.dequeue(p.id);
				}
				if (--pending <= 0) {
					library.postInfoLoaded = true;
					// write raw provider data to cache
					this.cache.flush();
					log.info('Finished loading library posts');
				}
			});
		}
	}

	/**
	 * Parse cached post data
	 * @param {Library} library
	 * @param {Object} cacheData
	 * @private
	 */
	_loadAllCachedPosts(library, cacheData) {
		for (let p of library.posts) {
			// TODO: handle empty data
			this._parsePostFields(p, cacheData[p.id]);
		}
		library.postInfoLoaded = true;
		log.info('Finished loading library posts');
	}

	/**
	 * Load library from source provider
	 * @param {function(Library)} callback
	 * @param {Object.<String>} [photoTags] Photo tags with slug and full name
	 * @private
	 */
	_loadLibraryFromSource(callback, photoTags) {}

	/**
	 * Retrieve first (could be more than one) post that photo belongs to
	 * @param {String} photoID
	 * @param {function(Post)} callback
	 */
	photoPostID(photoID, callback) {}

	/**
	 * Load photo tags from cache or source
	 * @param {function(Object.<String>)} callback
	 */
	loadPhotoTags(callback) {
		this.cache.getPhotoTags(tags => {
			if (tags !== null) {
				log.info('Photo tags loaded from cache');
				callback(tags)
			} else {
				this._loadPhotoTagsFromSource(rawTags => {
					let tags = this.factory.buildPhotoTags(rawTags, this.options.excludeTags);
					this.cache.addPhotoTags(tags);
					callback(tags);
				});
			}
		});
	}

	/**
	 * @param {function} [callback]
	 */
	removePhotoTags(callback) {
		this.cache.removePhotoTags(done => {
			if (done) {
				log.warn('Removed photo tags');
				this._loadPhotoTagsFromSource(callback);
			} else {
				log.error('Failed to remove photo tags');
				if (is.callable(callback)) { callback(); }
			}
		});
	}

	/**
	 * Load photo tags from source provider
	 * @param {function(Object.<String>)} callback
	 * @private
	 */
	_loadPhotoTagsFromSource(callback) {}

	/**
	 * @param {String} photoID
	 * @param {function(Size[])} callback
	 */
	loadPhotoSizes(photoID, callback) {}

	/**
	 *
	 * @param {String[]|String} tags
	 * @param {function(Photo[])} callback
	 */
	loadPhotosWithTags(tags, callback) {}

	/**
	 * Provider-specific field parsing
	 * @param {Post} post
	 * @param {Object} fields
	 * @private
	 */
	_parsePostFields(post, fields) {}

	/**
	 * Provider-specific photo parsing
	 * @param {Post} post
	 * @param {Object} photos
	 * @private
	 */
	_parsePostPhotos(post, photos) {}
}

module.exports = DataBase;
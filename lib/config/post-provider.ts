import { env } from '@toba/tools';
import { Token } from '@toba/oauth';
import { FlickrConfig, Flickr } from '@trailimage/flickr-provider';
import { domain } from './models';

/** Preferred photo sizes */
export const sizes = {
   thumb: Flickr.SizeCode.Square150,
   preview: Flickr.SizeCode.Small320,
   normal: [
      Flickr.SizeCode.Large1024,
      Flickr.SizeCode.Medium800,
      Flickr.SizeCode.Medium640
   ],
   big: [
      Flickr.SizeCode.Large2048,
      Flickr.SizeCode.Large1600,
      Flickr.SizeCode.Large1024
   ]
};

export const postProvider: FlickrConfig = {
   userID: '60950751@N04',
   appID: '72157631007435048',
   featureSets: [{ id: '72157632729508554', title: 'Ruminations' }],
   timeZoneOffset: -7,
   /** Photo sizes that must be retrieved for certain contexts */
   // photoSize: {
   //    post: sizes.normal.concat(sizes.big, sizes.preview),
   //    map: [Flickr.SizeUrl.Small320],
   //    search: [Flickr.SizeUrl.Square150]
   // },
   searchPhotoSizes: [Flickr.SizeCode.Square150],
   setPhotoSizes: [
      Flickr.SizeCode.Medium640,
      Flickr.SizeCode.Medium800,
      Flickr.SizeCode.Large1024,
      Flickr.SizeCode.Large1600,
      Flickr.SizeCode.Large2048
   ],
   excludeSets: ['72157631638576162'],
   excludeTags: [
      'Idaho',
      'United States of America',
      'Abbott',
      'LensTagger',
      'Boise'
   ],
   maxRetries: 10,
   retryDelay: 300,
   auth: {
      apiKey: env('FLICKR_API_KEY'),
      secret: env('FLICKR_SECRET'),
      callback: 'http://www.' + domain + '/auth/flickr',
      token: {
         access: env('FLICKR_ACCESS_TOKEN', null),
         secret: env('FLICKR_TOKEN_SECRET', null),
         request: null as string
      } as Token
   }
};
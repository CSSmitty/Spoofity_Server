import { RequestHandler } from 'express';
import { URL } from 'url';
import {
  SPOTIFY_ACCOUNT_URL,
  SPOTIFY_CLIENT_ID,
  AUTHORIZE_CALLBACK_URL,
  SPOTIFY_SCOPES
} from '../../const';

/** Create a spotify authorize url for a client to go to and authorize the app */
const createSpotifyAuthorizeUrl = (requestId: string) => {
  const spotifyAuthorizeURL = new URL('authorize', SPOTIFY_ACCOUNT_URL);
  spotifyAuthorizeURL.searchParams.set('client_id', SPOTIFY_CLIENT_ID);
  spotifyAuthorizeURL.searchParams.set('response_type', 'code');
  spotifyAuthorizeURL.searchParams.set('redirect_uri', AUTHORIZE_CALLBACK_URL);
  spotifyAuthorizeURL.searchParams.set('scope', SPOTIFY_SCOPES.join(' '));
  spotifyAuthorizeURL.searchParams.set('state', requestId);
  return spotifyAuthorizeURL.href;
};

/**
 * Redirect the request to a spotify authorize URL
 */
export const spotifyAuthorize: RequestHandler = async (_, res) => {
  try {
    // TODO: generate a request ID and store it in the database
    // This will act ensure that auth requests originate from us
    const requestId = 'test';

    const authorizeUrl = createSpotifyAuthorizeUrl(requestId);

    res.redirect(303, authorizeUrl);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

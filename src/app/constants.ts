import { TrackField } from './types';

export const SPOTIFY_TOKEN = 'SpotifyAccessToken';

export const BIG_TITLE = 'Spex';
export const SUB_TITLE = 'Spotify Playlist Exporter';

export const PLAYLISTS_LIMIT = 50;

export const INITIAL_OFFSET = 0;

export const PLAYLIST_ITEM_LIMIT = 100;

export const BASE_API_URL = 'https://api.spotify.com/v1/';

export const DEFAULT_SEPARATOR = ',';

export const TRACK_FIELDS: TrackField[] = [
  { field: 'name', displayName: 'Name', checked: true },
  { field: 'number', displayName: 'Track Number', checked: true },
  { field: 'artist', displayName: 'Artist', checked: false },
  { field: 'album', displayName: 'Album', checked: false },
  { field: 'url', displayName: 'URL', checked: false },
  { field: 'duration', displayName: 'Duration', checked: false },
  { field: 'explicit', displayName: 'Explicit',  checked: false },
  { field: 'headers', displayName: 'Include Headers', checked: false },
];

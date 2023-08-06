export interface SpotifyUserDataApiObject {
  country: string;
  display_name: string;
  email: string;
  external_urls: object;
  followers: object;
  href: string;
  id: string;
  images: Array<{ height: null | number; url: string; width: null | string; }>;
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyProfileData {
  name: string;
  email: string;
  product: string;
  id: string;
  imageUrl: string | null;
  country: string;
}

export interface SpotifyPlaylistsList extends SpotifyApiObject {
  items: Array<SpotifyPlaylist>;
}

interface SpotifyPlaylist {
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
  public: boolean;
  tracks: {
    total: number;
  };
}

export interface Playlist {
  collaborative: boolean;
  id: string;
  name: string;
  publicStatus: boolean;
  tracksCount: number;
  href: string;
}

export interface PlaylistMetaData {
  collaborative: boolean;
  description: string;
  tracks: { total: number; };
  followers: {
    total: number;
  };
  id: string;
  name: string;
  public: boolean;
  images: Array<{ height: null | number; url: string; width: null | string; }>;
}

export interface SpotifyTrackList extends SpotifyApiObject{
  items: Array<{ track: DisplayTrackApiObject }>;
}

interface SpotifyTrack {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    id: string;
  };
  track: TrackApiObject;
}

interface TrackApiObject {
  album: AlbumApiObject;
  artists: Array<ArtistApiObject>;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  id?: string;
  name: string;
}

interface AlbumApiObject {
  artists?: Array<ArtistApiObject>;
  external_urls?: {
    spotify: string;
  };
  id: string;
  name: string;
  release_date?: string;
  total_tracks?: number;
}

interface ArtistApiObject {
  external_urls?: {
    spotify: string;
  };
  id?: string;
  name: string;
}

interface SpotifyApiObject {
  href: string;
  limit: number;
  offset: number;
  total: number;
}

export interface Track {
  title?: string;
  album?: string;
  artists?: string;
  duration?: string;
  explicit?: boolean;
  url?: string;
}

export interface WritableTrackList {
  items: Array<{ track: TrackApiObject }>;
  total: number;
}



export interface TrackField {
  field: string;
  checked: boolean;
  displayName: string;
}

interface DisplayTrackApiObject {
  id: string;
  name: string;
  artists: Array<{ name: string; }>;
}

export interface DisplayTrackObject {
  id: string;
  name: string;
  artists: string;
}

export interface DialogResult {
  separator: string;
  selectedFields: Array<string>;
}

interface DisplayTrackApiObject {
  id: string;
  name: string;
  artists: Array<{ name: string; }>;
}

export interface DisplayTrackObject {
  id: string;
  name: string;
  artists: string;
}

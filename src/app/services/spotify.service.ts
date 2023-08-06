import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { PLAYLISTS_LIMIT, PLAYLIST_ITEM_LIMIT, BASE_API_URL, INITIAL_OFFSET, DEFAULT_SEPARATOR } from '../constants';
import {
  SpotifyPlaylistsList,
  SpotifyTrackList,
  PlaylistMetaData,
  SpotifyUserDataApiObject,
  Track,
  WritableTrackList,
} from '../types';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient, private helperService: HelperService) {
  }

  private clientId = '4d3ca951d1e44b3e8cb4732bfa790f5d';
  private scope = encodeURIComponent('playlist-read-private user-read-private user-read-email playlist-read-collaborative');
  private redirectUri = encodeURIComponent('http://localhost:4200/');
  private okToPlaylists = false;
  private subscriptions: Subscription[] = [];

  public authorize(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scope}&show_dialog=true`;
    window.location.href = authUrl;
  }

  public getPlaylistsRouteStatus(): boolean {
    return this.okToPlaylists;
  }

  public setPlaylistsRouteStatus(status: boolean): void {
    this.okToPlaylists = status;
  }

  public getUserData(): Observable<SpotifyUserDataApiObject> {
    const endpoint = `${BASE_API_URL}me`;
    return this.http.get<SpotifyUserDataApiObject>(endpoint);
  }

  public getAllPlaylists(offset: number): Observable<SpotifyPlaylistsList> {
    const endpoint = `${BASE_API_URL}me/playlists?limit=${PLAYLISTS_LIMIT}&offset=${offset}`;
    return this.http.get<SpotifyPlaylistsList>(endpoint);
  }

  public getPlaylistItemsToDisplay(playlistId: string, offset: number): Observable<SpotifyTrackList> {
    const fieldString = 'limit%2Ctotal%2Citems(track(name%2Cartists(name)))';
    const endpoint = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${offset}&fields=${fieldString}`;
    return this.http.get<SpotifyTrackList>(endpoint);
  }

  public getPlaylistMetaData(playlistId: string): Observable<PlaylistMetaData> {
    const fieldString = 'collaborative%2Cimages%2Cdescription%2Cfollowers(total)%2Cid%2Cname%2Cpublic';
    const endpoint = `${BASE_API_URL}playlists/${playlistId}?fields=${fieldString}`;
    return this.http.get<PlaylistMetaData>(endpoint);
  }

  public playlistToText(playlistId: string, fields: string[], separator: string, playlistName: string): void {
    let total = 0;
    console.log(playlistId);
    separator = separator !== '' ? separator : DEFAULT_SEPARATOR;
    const playlist: Array<string> = [];
    const fieldString = this.helperService.createSpotifyFieldsString(fields);
    const endpoint = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${INITIAL_OFFSET}&fields=${fieldString}`;
    const subscriptionFirst: Subscription = this.http.get<WritableTrackList>(endpoint).subscribe(data => {
      total = data.total;
      for (const item of data.items) {
        const track: Track = this.helperService.trackApiObject2TrackObject(item.track);
        const trackString = this.helperService.createTrackString(track, separator);
        playlist.push(trackString);
        if (playlist.length === total) {
          const blob = this.helperService.trackListToCSVString(playlist, separator, fields, playlistName);
          this.helperService.exportToCSV(blob);
        }
      }
      const iterationCount: number = this.helperService.getRequestIterationCount(total, PLAYLIST_ITEM_LIMIT);
      for (let i = 1; i <= iterationCount; i++) {
        const endpointX = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${PLAYLIST_ITEM_LIMIT * i}&fields=${fieldString}`;
        const childSubscription: Subscription = this.http.get<WritableTrackList>(endpointX).subscribe(d => {
          for (const item of d.items) {
            const track: Track = this.helperService.trackApiObject2TrackObject(item.track);
            const trackString = this.helperService.createTrackString(track, separator);
            playlist.push(trackString);
          }
          if (playlist.length === total) {
            const blob = this.helperService.trackListToCSVString(playlist, separator, fields, playlistName);
            this.helperService.exportToCSV(blob);
          }
        });
        this.subscriptions.push(childSubscription);
      }
    });
    this.subscriptions.push(subscriptionFirst);
  }

  public unsubscribeAll(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}

import { Injectable } from '@angular/core';
import { ArtistApiObject, Track, TrackApiObject } from '../types';

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  filename = 'PlaylistCSV - ';
  csvBlobs: Array<Blob> = [];

  constructor() {
  }

  public milliSecondsToDuration(milliSeconds: number): string {
    let seconds = milliSeconds / 1000;
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds}`;
  }

  public getArtistList(artists: Array<{ name: string } | ArtistApiObject>): string {
    let artistsList = '';
    for (const artist of artists) {
      artistsList += artist.name + ', ';
    }
    artistsList = artistsList.slice(0, -2);
    return artistsList;
  }

  public createSpotifyFieldsString(fields: string[]): string {
    let fieldSpotifyString = 'total%2C';
    let trackString = 'items(track(';
    if (fields.includes('album')) {
      trackString += 'album(name),';
    }
    if (fields.includes('artist')) {
      trackString += 'artists(name),';
    }
    if (fields.includes('url')) {
      trackString += 'external_urls(spotify),';
    }
    if (fields.includes('duration')) {
      trackString += 'duration_ms,';
    }
    if (fields.includes('id')) {
      trackString += 'id,';
    }
    for (const field of fields) {
      if (field === 'name' || field === 'explicit') {
        trackString += `${field},`;
      }
    }
    trackString = trackString.slice(0, -1) + '))';
    fieldSpotifyString += encodeURIComponent(trackString);
    return fieldSpotifyString;
  }

  public trackApiObject2TrackObject(trackApiObject: TrackApiObject): Track {
    const track: Track = {};
    if (trackApiObject.name) {
      track.title = trackApiObject.name;
    }
    if (trackApiObject.album) {
      track.album = trackApiObject.album.name;
    }
    if (trackApiObject.explicit !== undefined) {
      track.explicit = trackApiObject.explicit;
    }
    if (trackApiObject.external_urls) {
      track.url = trackApiObject.external_urls.spotify;
    }
    if (trackApiObject.duration_ms) {
      track.duration = this.milliSecondsToDuration(trackApiObject.duration_ms);
    }
    if (trackApiObject.artists) {
      track.artists = this.getArtistList(trackApiObject.artists);
    }
    return track;
  }

  public getRequestIterationCount(total: number, limit: number): number {
    return Math.floor(total / limit) + +(!!(total % limit)) - 1;
  }

  public createTrackString(track: Track, separator: string): string {
    let trackString = '';
    trackString += track.title ? track.title + separator : '';
    trackString += track.artists ? track.artists + separator : '';
    trackString += track.album ? track.album + separator : '';
    trackString += track.duration ? track.duration + separator : '';
    trackString += track.url ? track.url + separator : '';
    if (track.explicit !== undefined) {
      trackString += (track.explicit ? 'Explicit' : 'Not Explicit') + separator;
    }
    return trackString.split(separator).slice(0, -1).join(separator);
  }

  public createHeaderString(headers: Array<string>, separator: string): string {
    console.log(headers);
    let headerString = headers.includes('number') ? `Number${separator}` : '';
    headerString += headers.includes('name') ? `Title${separator}` : '';
    headerString += headers.includes('artists') ? `Artists${separator}` : '';
    headerString += headers.includes('album') ? `Album${separator}` : '';
    headerString += headers.includes('duration') ? `Duration${separator}` : '';
    headerString += headers.includes('url') ? `URL${separator}` : '';
    headerString += headers.includes('explicit') ? `ExplicitStatus${separator}` : '';
    return headerString.slice(0, -1);
  }

  public trackListToCSVString(trackStringList: Array<string>, separator: string, headers: Array<string>, playlistName: string): Blob {
    let csvString = '';
    this.filename = `${playlistName}.csv`;
    if (headers.includes('headers')) {
      const headerString = this.createHeaderString(headers, separator);
      csvString += headerString + '\n';
    }

    let tracksString = '';
    if (headers.includes('number')) {
      for (let i = 1; i <= trackStringList.length; i++) {
        tracksString += `${i}${separator}${trackStringList[i - 1]}\n`;
      }
    } else {
      tracksString = trackStringList.join('\n');
    }

    csvString += tracksString;
    return new Blob([csvString], {type: 'text/csv:charset=utf-8'});
  }

  public exportToCSV(blob: Blob): void {
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, this.filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}

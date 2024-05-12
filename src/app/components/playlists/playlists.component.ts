import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyListOption as MatListOption } from '@angular/material/legacy-list';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ExportOptionsComponent } from '../export-options/export-options.component';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../types';
import { Subscription } from 'rxjs';
import { PLAYLISTS_LIMIT, INITIAL_OFFSET } from '../../constants';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy  {

  playlists: Array<Playlist> = [];
  loading = false;
  subscriptions: Array<Subscription> = [];
  playlistsTotal!: number;
  selectedPlaylists: Array<{ id: string, name: string }> = [];

  constructor(
    private dialog: MatDialog,
    private spotifyService: SpotifyService,
    private helperService: HelperService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getPlaylists(INITIAL_OFFSET);
    const iterationCount: number = this.helperService.getRequestIterationCount(this.playlistsTotal, PLAYLISTS_LIMIT);
    for (let i = 1; i <= iterationCount; i++) {
      this.getPlaylists(i);
    }
  }

  private getPlaylists(offset: number): void {
    const playlistsSubscription: Subscription = this.spotifyService.getAllPlaylists(offset).subscribe(data => {
      this.playlistsTotal = data.total;
      for (const playlist of data.items) {
        const playlistsObject: Playlist = {
          name: playlist.name,
          id: playlist.id,
          publicStatus: playlist.public,
          collaborative: playlist.collaborative,
          tracksCount: playlist.tracks.total,
          href: playlist.external_urls.spotify
        };
        this.playlists.push(playlistsObject);
      }
      this.loading = false;
    });
    this.subscriptions.push(playlistsSubscription);
  }

  displayExportOptionsDialog(playlistId: string = 'multiple', playlistName: string = ''): void {
    if (this.selectedPlaylists.length === 0 && playlistId === 'multiple') {
      this.snackBar.open('At least select one playlist', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7000
      });
    } else {
      const dialogRef = this.dialog.open(ExportOptionsComponent, {
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && playlistId !== 'multiple' && playlistId !== 'all') { // Single playlist export
          this.spotifyService.playlistToText(playlistId, result.selectedFields, result.separator, playlistName);
        } else if (result !== undefined && playlistId === 'all') { // All playlists export
          for (const playlist of this.playlists) {
            this.spotifyService.playlistToText(playlist.id, result.selectedFields, result.separator, playlist.name);
          }
        } else if (result !== undefined && playlistId === 'multiple') { // Selected playlists export
          for (const selectedPlaylist of this.selectedPlaylists) {
            this.spotifyService.playlistToText(selectedPlaylist.id, result.selectedFields, result.separator, selectedPlaylist.name);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

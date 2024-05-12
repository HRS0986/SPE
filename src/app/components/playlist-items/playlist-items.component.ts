import { Component, Input, OnInit } from '@angular/core';
import { ExportOptionsComponent } from '../export-options/export-options.component';
import { SpotifyService } from '../../services/spotify.service';
import { Subscription } from 'rxjs';
import { PlaylistMetaData, DisplayTrackObject, DialogResult } from '../../types';
import { INITIAL_OFFSET, PLAYLIST_ITEM_LIMIT } from '../../constants';
import { HelperService } from '../../services/helper.service';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-playlist-items',
    templateUrl: './playlist-items.component.html',
    styleUrls: ['./playlist-items.component.css']
})
export class PlaylistItemsComponent implements OnInit {

    @Input() playlistId!: string;

    loading = false;
    subscriptions: Subscription[] = [];
    playlistItems: DisplayTrackObject[] = [];
    playlistMetaData!: PlaylistMetaData;
    selectedTracks: string[] = [];
    totalTracksCount = 0;

    constructor(
        private dialog: MatDialog,
        private spotifyService: SpotifyService,
        private snackBar: MatSnackBar,
        private helperService: HelperService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.getPlaylistItems(this.playlistId, INITIAL_OFFSET);
        this.loading = true;
        const iterationCount: number = this.helperService.getRequestIterationCount(this.totalTracksCount, PLAYLIST_ITEM_LIMIT);
        for (let i = 1; i <= iterationCount; i++) {
            this.getPlaylistItems(this.playlistId, i);
        }
        const playlistMetaDataSubscription: Subscription = this.spotifyService.getPlaylistMetaData(this.playlistId).subscribe(data => {
            this.playlistMetaData = data;
            this.loading = false;
        });
        this.subscriptions.push(playlistMetaDataSubscription);
    }

    private getPlaylistItems(playlistId: string, offset: number): void {
        const playlistsItemsSubscription: Subscription = this.spotifyService.getPlaylistItemsToDisplay(playlistId, offset).subscribe(data => {
            this.totalTracksCount = data.total;
            for (const track of data.items) {
                const trackObject: DisplayTrackObject = {
                    id: track.track.id,
                    name: track.track.name,
                    artists: this.helperService.getArtistList(track.track.artists)
                };
                this.playlistItems.push(trackObject);
            }
            this.loading = false;
        });
        this.subscriptions.push(playlistsItemsSubscription);
    }

    displayExportOptionsDialog(): void {
        const dialogRef = this.dialog.open(ExportOptionsComponent, {
            width: '300px'
        });
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            if (result !== undefined) {
                this.spotifyService.playlistToText(this.playlistId, result.selectedFields, result.separator, this.playlistMetaData.name);
            }
        });
        this.spotifyService.unsubscribeAll();
    }

    exportSelected(trackId: string = 'multiple'): void {
        if (this.selectedTracks.length === 0 && trackId === 'multiple') {
            this.snackBar.open('At least select one track', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 7000
            });
        } else {
            console.log(this.selectedTracks);
            const dialogRef = this.dialog.open(ExportOptionsComponent, {
                width: '300px'
            });
            dialogRef.afterClosed().subscribe((result: DialogResult) => {
                if (result !== undefined) {
                    result.selectedFields.push('id');
                    this.spotifyService.playlistToText(this.playlistId, result.selectedFields, result.separator, this.playlistMetaData.name, false, this.selectedTracks);
                }
            });
        }
    }
}

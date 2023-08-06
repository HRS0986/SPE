import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { PlaylistMetaData, SpotifyProfileData } from '../../types';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
    selector: 'app-basic-layout',
    templateUrl: './basic-layout.component.html',
    styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit, OnDestroy {

    playlistsStatus: string | null = 'all';
    playlistId!: string;
    userData!: SpotifyProfileData;
    loading = false;
    playlist!: PlaylistMetaData;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private spotifyService: SpotifyService,
        private tokenStorageService: TokenStorageService
    ) {
        const routeParams = this.route.snapshot.paramMap;
        this.playlistsStatus = routeParams.get('playlistsStatus') ? routeParams.get('playlistsStatus') : 'all';
        this.route.params.subscribe(params => {
            this.playlistsStatus = params.playlistsStatus;
            if (this.playlistsStatus !== 'all') {
                this.playlistId = this.playlistsStatus as string;
                const playlistMetaDataSubscription: Subscription = spotifyService.getPlaylistMetaData(this.playlistId).subscribe(data => {
                    this.playlist = data;
                    console.log(this.playlist);
                });
                this.subscriptions.push(playlistMetaDataSubscription);
            }
        });
    }

    ngOnInit(): void {
        this.loading = true;
        const userDataSubscription: Subscription = this.spotifyService.getUserData().subscribe(data => {
            this.userData = {
                name: data.display_name,
                product: data.product,
                country: data.country,
                id: data.id,
                imageUrl: data.images[1].url,
                email: data.email
            };
        });
        this.loading = false;
        this.subscriptions.push(userDataSubscription);
    }

    ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    switchAccount(): void {
        this.tokenStorageService.clearSession();
        this.spotifyService.authorize();
    }

    endSession(): void {
        this.tokenStorageService.clearSession();
        this.spotifyService.setPlaylistsRouteStatus(false);
        this.router.navigate(['/']);
    }

}

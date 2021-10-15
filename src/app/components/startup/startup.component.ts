import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router, Event, RouterEvent } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { BIG_TITLE, SPOTIFY_TOKEN } from '../../constants';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  public loading = false;
  public bigTitle: string = BIG_TITLE;

  constructor(private spotifyService: SpotifyService, private router: Router, private tokenStorageService: TokenStorageService) {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof RouterEvent) {
        const currentUrl: string = event.url;

        if (currentUrl.includes('#')) {
          this.loading = true;

          const urlParts: string[] = currentUrl.split('#');
          const params: string[] = urlParts[1].split('&');
          const accessToken: string = params[0].split('=')[1];

          this.tokenStorageService.saveToSessionStorage(accessToken, SPOTIFY_TOKEN);
          this.spotifyService.setPlaylistsRouteStatus(true);
          this.loading = false;
          this.router.navigate(['/playlists/all']);
        }

      }

    });
  }

  okToDisplay = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.okToDisplay = true;
    }, 3000);
  }

  public startAuth(): void {
    const token = this.tokenStorageService.getFromSessionStorage(SPOTIFY_TOKEN);
    if (!token) {
      this.spotifyService.authorize();
      this.spotifyService.setPlaylistsRouteStatus(true);
    } else {
      this.router.navigate(['/playlists/all']);
      this.spotifyService.setPlaylistsRouteStatus(true);
    }
  }
}

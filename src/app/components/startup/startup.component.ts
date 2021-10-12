import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router, Event, RouterEvent } from '@angular/router';
import { SpotifyProfileData } from '../../types';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  public loading = false;

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof RouterEvent) {
        const currentUrl: string = event.url;

        if (currentUrl.includes('#')) {
          this.loading = true;

          const urlParts: string[] = currentUrl.split('#');
          const params: string[] = urlParts[1].split('&');
          const accessToken: string = params[0].split('=')[1];

          spotifyService.setAccessToken(accessToken);
          const userData: SpotifyProfileData = spotifyService.getUserData();
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
    this.spotifyService.authorize();
  }
}

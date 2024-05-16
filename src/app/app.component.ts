import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spotify-Playlist-Exporter';

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.tokenStorageService.deleteFromSessionStorage('SpotifyAccessToken');
    }, 360000);
  }
}

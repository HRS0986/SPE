import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


export function playlistGuard(): boolean | UrlTree {
    const playlistService: SpotifyService = inject(SpotifyService);
    const router: Router = inject(Router);
    const isPlaylistsUnlocked = playlistService.getPlaylistsRouteStatus();
    if (isPlaylistsUnlocked) {
      return true;
    } else {
      return router.createUrlTree(['/']);
    }
}

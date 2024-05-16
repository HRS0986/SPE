import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


export function playlistGuard(): CanActivateFn {
  return () => {
    const playlistService: SpotifyService = inject(SpotifyService);
    const router: Router = inject(Router);
    const isPlaylistsUnlocked = playlistService.getPlaylistsRouteStatus();
    if (isPlaylistsUnlocked) {
      return true;
    }
    return router.createUrlTree(['/']);
  };
}

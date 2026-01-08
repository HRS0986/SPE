import { Routes } from '@angular/router';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { StartupComponent } from './components/startup/startup.component';
import { playlistGuard } from './guards/playlist.guard';

export const routes: Routes = [
    { path: 'playlists/:playlistsStatus', component: BasicLayoutComponent, canActivate: [playlistGuard] },
    { path: '', component: StartupComponent },
];

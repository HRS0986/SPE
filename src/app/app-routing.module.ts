import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';

import { StartupComponent } from './components/startup/startup.component';
import { playlistGuard } from './guards/playlist.guard';


const routes: Routes = [
  {path: 'playlists/:playlistsStatus', component: BasicLayoutComponent, canActivate: [playlistGuard]},
  {path: '', component: StartupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

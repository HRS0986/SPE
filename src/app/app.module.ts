import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistItemsComponent } from './components/playlist-items/playlist-items.component';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { StartupComponent } from './components/startup/startup.component';
import { ExportOptionsComponent } from './components/export-options/export-options.component';

import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';
import { tokenInterceptor } from "./helpers/token.interceptor";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";


@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    PlaylistItemsComponent,
    BasicLayoutComponent,
    StartupComponent,
    ExportOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}},
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

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
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    PlaylistItemsComponent,
    BasicLayoutComponent,
    StartupComponent,
    ExportOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ExportOptionsComponent],
})
export class AppModule { }

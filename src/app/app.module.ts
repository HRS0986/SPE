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
import { MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/legacy-dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { PlaylistGuard } from './guards/playlist.guard';
import { TokenInterceptor } from './helpers/token.interceptor';


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
        HttpClientModule
    ],
    providers: [
        PlaylistGuard,
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true } },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

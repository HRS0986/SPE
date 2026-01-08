import { Component, inject, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent implements OnInit {
  private tokenStorageService: TokenStorageService = inject(TokenStorageService);

  ngOnInit(): void {
    setInterval(() => {
      this.tokenStorageService.deleteFromSessionStorage('SpotifyAccessToken');
    }, 360000);
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  // styleUrls: ['../app.component.scss', './header.component.scss']
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  appHeaderTitle = 'Angular18 A Holy-Grail Implementation based on mat-grid-list';

}

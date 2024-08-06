import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
// import { HeaderComponent } from './header/header.component';
// import { NavrowComponent } from './navrow/navrow.component';
// import { LeftpaneComponent } from './leftpane/leftpane.component';
// import { MainComponent } from './main/main.component';
// import { RightpaneComponent } from './rightpane/rightpane.component';
// import { FooterComponent } from './footer/footer.component';


export interface Tile {
  cols: number;
  rows: number;
  text: string;
  color: string;
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatGridListModule,
    // HeaderComponent,
    // NavrowComponent,
    // LeftpaneComponent,
    // MainComponent,
    // RightpaneComponent,
    // FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular18-Holy-Grail-repo1(Grid)';

  tiles: Tile[] = [
    {text: 'Area A', cols: 12, rows: 1, color: 'dodgerblue'},
    {text: 'Area B', cols: 12, rows: 1, color: 'lightblue'},
    {text: 'Area C', cols: 2, rows: 8, color: 'lightpink'},
    {text: 'Area D', cols: 9, rows: 8, color: 'lightgray'},
    {text: 'Area E', cols: 1, rows: 8, color: 'lightgoldenrodyellow'},
    {text: 'Area F', cols: 12, rows: 1, color: 'lightseagreen'},
  ];



}
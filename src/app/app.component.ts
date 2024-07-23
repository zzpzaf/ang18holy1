import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavrowComponent } from './navrow/navrow.component';
import { LeftpaneComponent } from './leftpane/leftpane.component';
import { MainComponent } from './main/main.component';
import { RightpaneComponent } from './rightpane/rightpane.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    NavrowComponent,
    LeftpaneComponent,
    MainComponent,
    RightpaneComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular18-pure-repo1';

  allPadding: number = 6;

  hhLarge = 80;
  nrhLarge  = 50;
  fhLarge  = 60;


  leftp_Width = 200;
  main_Width = 0; 
  rightp_Width = 200;


  get allPaddingStyle() {
    return `${this.allPadding}px`;
  }

  get hhLargeStyle() {
    return `${this.hhLarge}px`;
  }

  get nrhLargeStyle() {
    return `${this.nrhLarge}px`;
  }

  get fhLargeStyle() {
    return `${this.fhLarge}px`;
  }

  
}
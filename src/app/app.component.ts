import { Component } from '@angular/core';
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
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular18-pure-repo1';
}

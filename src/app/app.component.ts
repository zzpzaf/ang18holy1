import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavrowComponent } from './navrow/navrow.component';
import { LeftpaneComponent } from './leftpane/leftpane.component';
import { MainComponent } from './main/main.component';
import { RightpaneComponent } from './rightpane/rightpane.component';
import { FooterComponent } from './footer/footer.component';

interface LayoutConfig {
  [key: string]: { value: number | string; unit: string };
}

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
  title = 'Angular18-Holy-Grail-repo1(Grid)';

  private layoutConfig: LayoutConfig = {
    allPadding: { value: 2, unit: 'px' },

    hhSmall: { value:120, unit: 'px' },
    nrhSmall: { value: 'min-content', unit: '' },
    lphSmall: { value: .2, unit: 'fr' },
    mhSmall: { value: 1.7, unit: 'fr' },
    rphSmall: { value:'min-content', unit: '' },
    fhSmall: { value: 'min-content', unit: '' },

    hhMedium: { value:120, unit: 'px' },
    nrhMedium: { value: 40, unit: 'px' },
    // rphMedium: { value:'min-content', unit: '' },
    rphMedium: { value: 50, unit: 'px' },
    fhMedium: { value: 60, unit: 'px' },
    lpw1Medium: { value: 180, unit: 'px' },
    lpw2Medium: { value: 20, unit: '%' },
    // lpwMedium: { value: 'min-content', unit: '' },

    hhLarge: { value:120, unit: 'px' },
    nrhLarge: { value: 50, unit: 'px' },
    fhLarge: { value: 60, unit: 'px' },
    // lpw1Large: { value: 200, unit: 'px' },
    // lpw2Large: { value: 25, unit: '%' },
    lpwLarge: { value: 'min-content', unit: '' },
    rpwLarge: { value: 'min-content', unit: '' }
  };

  get layoutConfigStyle(): string {
    return Object.entries(this.layoutConfig)
      .map(([key, { value, unit }]) => `--${key}: ${value}${unit}`)
      .join(';');
  }
}
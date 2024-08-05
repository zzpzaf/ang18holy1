
import { Component, effect } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IArticle, ICategory } from '../data.service';
import { ContentService } from '../content.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-navrow',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    // MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './navrow.component.html',
  styleUrl: './navrow.component.scss'
})
export class NavrowComponent {

  constructor(private contentService: ContentService) { 

    if (this.navMenuItems.length === 0) {
      this.navMenuItems = this.contentService.getCategories();
    }

    effect(()=> {
      this.navMenuItems = this.contentService.$categories();
      console.log('>===>> ' + this.componentName + ' - Nav Menu Items - Categories Changed/Received:', this.navMenuItems);
    });

  }

  componentName = this.constructor.name.replace('_', '');
  navMenuItems: ICategory[] = [];
  navbarName: string = "Navigation"
  articleId: number = 1;

  dashToggle(): void {
    console.log('dashToggle');
  }

  itemClicked(category: ICategory): void {
    console.log('>===>> ' + this.componentName + ' - itemClicked', category);
    this.contentService.getCategoryArticles(category.categoryId);
  }


}

import { Component, effect } from '@angular/core';
// import {CdkMenu, CdkMenuItem} from '@angular/cdk/menu';
import { ContentService } from '../content.service';
import { IArticle } from '../data.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [
    CommonModule,
    // CdkMenu, 
    // CdkMenuItem,
    MatListModule,
  ],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent {

  constructor(private contentService: ContentService) { 

    if (this.menuItems.length === 0) {
      this.menuItems = this.contentService.getCategoryArticles(1);
    }
    effect(()=> {
      this.menuItems = this.contentService.$categoryArticles();
      this.selectedItem = 0;
      console.log('>===>> ' + this.componentName + ' - Menu Items Changed/Received:', this.menuItems);
      // if (this.msg.sender != this.compName) this.msgReceived = this.msgReceived + this.msg.msg + '<br>';
    });

  }

  componentName = this.constructor.name.replace('_', '');
  menuItems: IArticle[] = [];
  selectedItem: number | null = null;

 

  itemClicked(item: IArticle, i: number): void {
    this.contentService.getArticleContent(item.articleId);
    this.selectedItem = i;
    // this.contentService.updateArticleLikes(item.articleId, 'views');
  }


}

import { Component, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { ContentService, IArticleViewsLikes } from '../content.service';
import { IArticle } from '../data.service';


@Component({
  selector: 'app-rightpane',
  standalone: true,
  imports: [
    // MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  templateUrl: './rightpane.component.html',
  styleUrl: './rightpane.component.scss'
})
export class RightpaneComponent {

  constructor(private contentService: ContentService) {

    if (this.allArticleViewsLikes.length === 0) {
      this.contentService.geAlltArticles();
    }

    effect(()=> {
      this.allArticleViewsLikes = this.contentService.$articleViewsLikes();
      this.currentArticle = this.contentService.$Article();
      console.log('>===>> ' + this.componentName + ' - Current Article:', JSON.stringify(this.currentArticle));
      this.views = this.allArticleViewsLikes.find((article: IArticleViewsLikes) => article.articleId === this.currentArticle.articleId)?.views || 0;
      this.likes = this.allArticleViewsLikes.find((article: IArticleViewsLikes) => article.articleId === this.currentArticle.articleId)?.likes || 0;
      // console.log('>===>> ' + this.componentName + ' - Nav Menu Items - Categories Changed/Received:', this.navMenuItems);
    });

  }

  componentName: string = this.constructor.name.replace('_', '');
  allArticleViewsLikes: IArticleViewsLikes[] = [];
  currentArticle!: IArticle;
  views: any ;
  likes: any;

  // viewClicked(): void {
  //   // this.views++;
  //   // this.contentService.getCategoryArticles(category.categoryId);
  // }

  likeClicked(): void {
    // this.likes++;
    this.contentService.updateArticleLikes(this.currentArticle.articleId, 'likes');
    // this.contentService.getCategoryArticles(category.categoryId);
  }




}

import { Component, effect } from '@angular/core';
import { ContentService } from '../content.service';
import { IArticle, IArticleContent } from '../data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private contentService: ContentService) { 
    effect(()=> {
      this.articleId = this.contentService.$Article().articleId;
      this.mainArticleContent = this.contentService.$articleContent();  
      // this is for updating the view of a post after a certain time lap (5 seconds of inactivity)
      if (this.previousArticleId !== this.articleId ) {
        // console.log('>===>> ' + this.componentName + ' - Previous Article Id:', this.previousArticleId + ' - New Article Id:', this.articleId);
        if ((performance.now() - this.startTime) > this.timeLap) {
          // The foolowing line updates/writes also the $articleViewsLikes signal from within the effects() - So be careful with this approach
          this.contentService.updateArticleLikes(this.previousArticleId, 'views');
          // console.log('>===>> ' + this.componentName + ' - startTime: ', this.startTime + ' - timeLap: ', performance.now() - this.startTime);
          this.startTime = performance.now();
          this.previousArticleId = this.articleId;
        }
        this.startTime = performance.now();
        this.previousArticleId = this.articleId;
      }  
    }, { allowSignalWrites: true }); // --> !!! Using effects to synchronize data by writing to signals can lead to confusing and potentially incorrect behavior, and should be enabled only when necessary.
  }

  componentName = this.constructor.name.replace('_', '');
  mainArticleContent: IArticleContent = {articleId: 0, articleTitle: '', articleContent: ''};
  articleId: number = 0;
  previousArticleId: number = 0;
  startTime: number = 0;
  timeLap: number = 5000;









}

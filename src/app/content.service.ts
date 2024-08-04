import { Injectable, signal } from '@angular/core';
import { DataService, IArticle, IArticleContent, ICategory } from './data.service';


export interface IMsg {
  sender: string;
  category: any;
  articleId: number;
}

export interface IArticleViewsLikes {
  articleId: number;
  views: number;
  likes: number;
}



@Injectable({
  providedIn: 'root'
})
export class ContentService {


  constructor(private dataSerice: DataService) { }

  componentName = this.constructor.name.replace('_', '');
  public msg: IMsg = {sender: '', category: '', articleId: 0};
  public categories: ICategory[] = [];
  // public $Msg = signal< IMsg>(this.msg); 

  public $Article = signal< IArticle>({articleId: 0, categoryId: 9, articleTitle: ''});
  public $articleContent = signal<IArticleContent>({articleId:0, articleTitle: '', articleContent: ''});

  public $category = signal< ICategory>({categoryId: 0, categoryTitle: ''});
  public $categories = signal< ICategory[]>(this.categories); 
  public $categoryArticles = signal< IArticle[]>([]);

  public allArticles: IArticle[] = [];
  public $allArticles = signal< IArticle[]>(this.allArticles);

  public articleViewsLikes: IArticleViewsLikes[] = [];
  public $articleViewsLikes = signal< IArticleViewsLikes[]>(this.articleViewsLikes);

  // It should be called from navrow component
  // $categoryTitles would serve as a signal to navrow component
  public getCategories(): ICategory[] {
    this.dataSerice.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories
      this.$categories.set(this.categories);
      //this.$categoryTitles.set(this.$categories().map((category: ICategory) => category.categoryTitle));
    });
    return this.categories;
  }


  public getCategory(categoryId: number): string[] {
    let category: ICategory = {categoryId: 0, categoryTitle: ''};
    this.dataSerice.getCategories().subscribe((categories: ICategory[]) => {
      let foundCategory = categories.find((category: ICategory) => category.categoryId === categoryId);
      if (foundCategory) {
        category = foundCategory;
      } else {
        category = {categoryId: 0, categoryTitle: "Category Not Found!"};
      }
      this.$category.set(category);
    });
    return [category.categoryTitle];
  }


  public geAlltArticles(): IArticle[] {
    let allArticles: IArticle[] = [];
    this.dataSerice.getArticles().subscribe((articles: IArticle[]) => {
      allArticles = articles;
      this.allArticles = allArticles;
      this.$allArticles.set(allArticles);

      for (let article of this.allArticles) {
        this.articleViewsLikes.push({articleId: article.articleId, views: 0, likes: 0});
        this.$articleViewsLikes.set(this.articleViewsLikes);
        console.log('>===>> ' + this.componentName + ' - Articles:', JSON.stringify(articles));
      }

    });
    return allArticles;
  }



  // It should be called from navrow component initialy for categoryId=1 and then, be constantly monitored in leftpane component
  // $articleTitles would serve as a signal to leftpane component
  public getCategoryArticles(categoryId: number): IArticle[] {
    // console.log('>===>> ' + this.componentName + ' - Category Id: ', categoryId);
    let categoryArticles: IArticle[] = [];
    //let articleTitles: string[] = [];
    this.dataSerice.getArticles().subscribe((categories: IArticle[]) => {
      categoryArticles = categories.filter((article: IArticle) => article.categoryId === categoryId);
      //articleTitles = categoryArticles.map((article: IArticle) => article.articleTitle);
      this.$categoryArticles.set(categoryArticles);
      this.getArticleContent(categoryArticles[0].articleId);
    });
    // console.log('>===>> ' + this.componentName + ' - Category Articles: ', categoryArticles); 
    return categoryArticles;
  }







  // It should be called from navrow component initialy for articleId=1 and then, be constantly monitored in main component
  // $articleContent would serve as a signal to main component
  public getArticleContent(articleId: number): IArticleContent {
    // let catId: number = 1;
    //let article: IArticle = {articleId: 0, categoryId: 0, articleTitle: ""};
    let articleContent: IArticleContent = {articleId: 0, articleTitle: '',  articleContent: ""};
    this.dataSerice.getArticlesContents().subscribe((articles: IArticleContent[]) => {
      let foundArticle = articles.find((article: IArticleContent) => (article.articleId === articleId));
      if (foundArticle) {
        articleContent = foundArticle;
        this.$Article.set({articleId: articleContent.articleId, categoryId: 9, articleTitle: articleContent.articleTitle});
      } else {
        articleContent = {articleId: 0, articleTitle: "Atricle Content Not Found!", articleContent: "No Article Content Found!"};       
      }
      this.$articleContent.set(articleContent);
    });
    return articleContent;
  }



  public requestArticleContent(msg: IMsg) {
    this.msg = msg;
    console.log('>===>> ' + this.componentName + ' - article:  ' + JSON.stringify(this.msg)) ;
    let articleContent = this.getArticleContent(this.msg.articleId);

  }

 
  // public updateArticleViews() {
  //   console.log('>===>> ' + this.componentName + ' - Article Views Updated!');
  // }

  public updateArticleLikes(articleId: number, updateWhat: any) {

    if (updateWhat !== 'likes' && updateWhat !== 'views') {
      console.error('>===>> ' + this.componentName + ` - Invalid Update Request: ${updateWhat}`);
      return;
    }

    const article = this.articleViewsLikes.find((article: IArticleViewsLikes) => article.articleId === articleId);
    
    if (article) {
      if (updateWhat === 'views') {
        article.views++;
      } else if (updateWhat === 'likes') {  
        article.likes++;
      }  
      this.articleViewsLikes = this.articleViewsLikes.map((article: IArticleViewsLikes) => article.articleId === articleId ? article : article);
      this.$articleViewsLikes.set(this.articleViewsLikes);

    } else {
        console.error('>===>> ' + this.componentName + ` - Article with ID ${articleId} not found.`);
    }
  }


}

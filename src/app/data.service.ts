import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

export interface IArticle {
  articleId: number;
  categoryId: number;
  articleTitle: string;
}

export interface IArticleContent {
  articleId: number;
  articleTitle: string;
  articleContent: string;
}

export interface ICategory {
  categoryId: number;
  categoryTitle: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  //baseURL:string = 'http://localhost:8080/api/';
  baseURL: string = '/assets/';

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(this.baseURL + `categories.json`)
      .pipe(retry(1), catchError(this.handleError));
  }


  getArticles(): Observable<IArticle[]> {
    return this.http
      .get<IArticle[]>(this.baseURL + `articles.json`)
      .pipe(retry(1), catchError(this.handleError));
  }


  getArticlesContents(): Observable<IArticleContent[]> {
    return this.http
      .get<IArticleContent[]>(this.baseURL + `artontents.json`)
      .pipe(retry(1), catchError(this.handleError));
  }


  // getArticleById(articleId: number): Observable<IArticle> {

  //   return this.http
  //     .get<IArticle>(this.baseURL + `articles.json`)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

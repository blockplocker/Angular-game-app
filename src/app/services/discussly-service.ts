import { Injectable } from '@angular/core';
import { Category, Client, Post, Comment } from '../Domain/client';

@Injectable({
  providedIn: 'root'
})
export class DiscusslyService {
  
  constructor(private Client: Client) {
  }

  getCategories() {
    return this.Client.categoriesAll();
  }

  createCategory(category: Category) {
    return this.Client.categoriesPOST(category);
  }

  updateCategory(id: number, category: Category) {
    return this.Client.categoriesPUT(id, category);
  }

  deleteCategory(id: number) {
    return this.Client.categoriesDELETE(id);
  }
  getComments() {
    return this.Client.commentsAll();
  }

  createComment(comment: Comment) {
    return this.Client.commentsPOST(comment);
  }

  updateComment(id: number, comment: Comment) {
    return this.Client.commentsPUT(id, comment);
  }

  deleteComment(id: number) {
    return this.Client.commentsDELETE(id);
  }

  getPosts() {
    return this.Client.postsAll();
  }

  createPost(post: Post) {
    return this.Client.postsPOST(post);
  }

  updatePost(id: number, post: Post) {
    return this.Client.postsPUT(id, post);
  }

  deletePost(id: number) {
    return this.Client.postsDELETE(id);
  }
}

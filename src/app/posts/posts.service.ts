import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostsService{

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

getPosts(){
  return [...this.posts]; //This is to remove some post without change original posts
}

getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}

addPost(title:string, content:string){

  const post : Post = {title:title, content:content}
  this.posts.push(post); //This is to push a new post into the posts retrieved
  this.postsUpdated.next ([...this.posts]);
}

}

import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostsService{

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient){}


getPosts(){
  //return [...this.posts]; //This is to remove some post without change original posts

  this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
  .subscribe((postData) =>{
    this.posts = postData.posts;
    this.postsUpdated.next([...this.posts]);

  });
}

getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}

addPost(title:string, content:string){

  const post : Post = {id:null, title:title, content:content}
  this.posts.push(post); //This is to push a new post into the posts retrieved
  this.postsUpdated.next ([...this.posts]);
}

}

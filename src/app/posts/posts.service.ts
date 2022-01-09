import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostsService{

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient){}


getPosts(){
  //return [...this.posts]; //This is to remove some post without change original posts

  this.http.get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
  .pipe(map((postData) => {
    return postData.posts.map(post =>{
      return {
        id: post._id,
        title: post.title,
        content: post.content

      };

    });

  }))
  .subscribe((transformedPost) =>{
    this.posts = transformedPost;
    this.postsUpdated.next([...this.posts]);

  });
}

getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}

addPost(title:string, content:string){

  const post : Post = {id:null, title:title, content:content}

  this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
   .subscribe((responseData) => {

    this.posts.push(post); //This is to push a new post into the posts retrieved
    this.postsUpdated.next ([...this.posts]);


   });
}

deletePost(postId:string){
  this.http.delete('http://localhost:3000/api/posts/' + postId)
  .subscribe(() =>{
    const updatedPost = this.posts.filter(post => post.id !== postId);
    //This is to be sure that delete a right post
    this.posts = updatedPost;
    this.postsUpdated.next([...this.posts]);

  });

}

}

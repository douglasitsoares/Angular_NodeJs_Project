import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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

getPost(id: string){
  return this.http.get<{_id:string, title:string, content:string}>('http://localhost:3000/api/posts/'+id);
}

addPost(title:string, content:string){

  const post : Post = {id:null, title:title, content:content}
    //responsible to get id from backend create and retrieved data
    this.http.post<{message:string, postId: string}>('http://localhost:3000/api/posts',post)
     .subscribe((responseData) => {
    const newPostId = responseData.postId; // Retrieve from backend logical created
    post.id = newPostId;
    this.posts.push(post); //This is to push a new post into the posts retrieved
    this.postsUpdated.next ([...this.posts]);
    //console.dir(post.id);
   });
}

updatePost(id: string, title: string, content:string){
  const post: Post = { id:id, title:title, content:content};// change post and result of backend
  this.http.put('http://localhost:3000/api/posts/'+id, post).subscribe(
    response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex]=post;
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]);//accept observer
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

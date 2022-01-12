import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute,  ParamMap } from "@angular/router";
import { PostsService} from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit{
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  form:FormGroup;
  public post: Post;
  private mode = 'create';
  private postId: string;


  constructor (public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit() {
      // Adaptation of ReactiveForm replacement to FormModule NgForm
      this.form = new FormGroup({
        'title': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        'content': new FormControl(null, {
          validators:[Validators.required, Validators.minLength(5)]})
      });

      this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if (paramMap.has('postId')){
          this.mode ='edit'; //using the same plataform to EDIT data injectable posts.service
          this.postId = paramMap.get('postId');
          //Adding Spinner
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData =>{
            this.isLoading = false;
            this.post = {id:postData._id, title:postData.title, content:postData.content};
          });
          // to be ensure that post will be able to perform data properly
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          });
        } else{
          this.mode = 'create';
          this.postId = null;
        }
      });
  }
  onSavePost() {

    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === "create"){
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }else{
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();

  }
}

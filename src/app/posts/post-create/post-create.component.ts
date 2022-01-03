import { Component } from "@angular/core";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'

})
export class PostCreateComponent{
  // This is very interesting replacemente HtmlTextArea for example set to #postInput for example in HTML
  enteredValue ='';
  newPost = 'Insert something';

  onAddPost(){
    this.newPost = this.enteredValue;
  }

}

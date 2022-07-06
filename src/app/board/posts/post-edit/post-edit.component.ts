import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(
    private postService : PostService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPost = new Post(
      null,
      Date.now(),
      value.title,
      value.content,
      value.imgUrl,
    );

    // if (this.editMode) {
    //   this.postService.updatePost(this.originalPost, newPost);
    // } else {
    //   this.postService.addPost(newPost);
    // }

    
    // this.router.navigate(['../']);
  }

  // holdHandler(event) {
  //   console.log(event);
    
  //   // this.el.nativeElement.style.outlineWidth = `${event/100}px`

  // }
}

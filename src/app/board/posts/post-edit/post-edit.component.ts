import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Output() editModeChange = new EventEmitter<boolean>()
  @Input() postId: string;

  post: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.postId) {
      this.post = this.postService.getPost(this.postId);
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPost = new Post(
      null,
      this.post?.date || null,
      value.title,
      value.content,
      value.imgUrl
    );

    if (this.editMode) {

      this.postService.updatePost(this.post, newPost);
    } else {
      this.postService.addPost(newPost);
    }
    form.reset()
  }

  handleCancel() {
    this.editModeChange.emit(false)
  }
}

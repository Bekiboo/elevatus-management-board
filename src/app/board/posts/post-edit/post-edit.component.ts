import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  @Input() postId: string;

  post: Post;

  form: FormGroup;
  imagePreview: string

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    if (this.postId) {
      this.post = this.postService.getPost(this.postId);
    }

    if (this.post)
      this.form.setValue({
        title: this.post.title,
        content: this.post.content,
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    // What do these two lines do exactly?
    this.form.patchValue({image: file})
    this.form.get('image').updateValueAndValidity()
    // console.log(file);
    // console.log(this.form);
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }   
    reader.readAsDataURL(file)
  }

  onSubmit() {
    const value = this.form.value;
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
    this.form.reset();
  }

  handleCancel() {
    this.editModeChange.emit(false);
  }
}

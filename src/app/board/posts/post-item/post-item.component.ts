import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post
  @Input() first: boolean

  originalPost: Post
  editMode: boolean = false
  id: number

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {  
  }

  handleEdit() {
    this.editMode = true
  }

  handleCancel() {
    this.editMode = false
  }

  deletePost() {
    this.postService.deletePost(this.post)
  }

}

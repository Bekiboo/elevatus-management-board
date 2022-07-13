import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private subscription: Subscription

  constructor( private postService: PostService
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.subscription = this.postService.postListChangedEvent.subscribe(
      (array: Post[]) => {this.posts = array}
    )    
  }
}

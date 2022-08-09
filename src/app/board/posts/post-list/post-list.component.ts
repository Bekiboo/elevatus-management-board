import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'admin-board-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('list', [
      state(
        'in',
        style({
          opacity: 1,
          // transform: 'translateY(0)',
          // marginTop: 0,
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          // transform: 'translateY(-100px)',
          // marginTop: '4rem',
        }),
        animate(1000),
      ]),
      transition('* => void', [
        animate(
          1000,
          style({
            opacity: 0,
            // transform: 'translateY(-100px)',
            // marginTop: '4rem',
          })
        ),
      ]),
    ]),
  ],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  close: number
  editMode: boolean = false;
  selected: number
  private subscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.subscription = this.postService.postListChangedEvent.subscribe(
      (array: Post[]) => {
        // Sort array from newest to oldest
        array = array.sort(function (a, b) {
          return b.date - a.date;
        });
        this.posts = array;
      }
    );
  }

  closeAll(index: number) {
    this.selected == index ? this.selected = null : this.selected = index
  }

  handleEdit() {
    this.editMode = true;
  }

  handleCancel() {
    this.editMode = false;
  }

  deletePost(post) {
    this.postService.deletePost(post);
    this.selected = null
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

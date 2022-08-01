import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postSelectedEvent = new Subject<Post>();
  postListChangedEvent = new Subject<Post[]>();

  private posts: Post[] = [];

  constructor(private http: HttpClient) {
    this.posts = this.getPosts();
  }

  getPosts(): Post[] {
    // Ce truc là fais ça
    this.http.get('http://localhost:3000/posts').subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        this.sortAndSend();
      },
      error: (e) => console.log(e.message),
    });
    return [];
  }

  getPost(id: string) {
    return this.posts.find((post) => post._id == id);
  }

  sortAndSend() {
    this.posts.sort();
    this.postListChangedEvent.next([...this.posts]);
  }

  addPost(post: Post, image: File) {
    if (!post) {
      return;
    }

    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);

    // Headers not need anymore, taken care of by FormData
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/posts',
        postData
      )
      .subscribe((responseData) => {
        // TODO ? From Academind "Uploading Files"
        // add new post to posts
        this.posts.push(responseData.post);
        this.sortAndSend();
      });
  }

  updatePost(originalPost: Post, newPost: Post, image: string | File) {
    if (!originalPost || !newPost) return;

    let postData: Post | FormData;

    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('_id', newPost._id);
      postData.append('title', newPost.title);
      postData.append('content', newPost.content);
      postData.append('image', image, newPost.title);
    } else {
      postData = newPost;
    }

    const pos = this.posts.findIndex((d) => d._id === originalPost._id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Post to the id of the old Post
    newPost._id = originalPost._id;

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put<{ message: string; post: Post }>(
        'http://localhost:3000/posts/' + originalPost._id,
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
        
        this.posts[pos] = responseData.post;
        this.sortAndSend();
      });
  }

  deletePost(post: Post) {
    if (!post) {
      return;
    }

    const pos = this.posts.findIndex((d) => d._id === post._id);

    if (pos < 0) {
      return;
    }

    console.log('post to be delete: ' + post._id);

    // delete from database
    this.http
      .delete('http://localhost:3000/posts/' + post._id)
      .subscribe((response: Response) => {
        this.posts.splice(pos, 1);
        this.sortAndSend();
      });
  }
}

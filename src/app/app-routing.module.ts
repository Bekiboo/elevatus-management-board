import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './board/children/children.component';
import { DashboardComponent } from './board/dashboard/dashboard.component';
import { PostEditComponent } from './board/posts/post-edit/post-edit.component';
import { PostItemComponent } from './board/posts/post-item/post-item.component';
import { PostsComponent } from './board/posts/posts.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'children',
    component: ChildrenComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
    // children: [
    //   {
    //     path: 'new',
    //     component: PostEditComponent,
    //   },
    //   {
    //     path: ':id/edit',
    //     component: PostEditComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

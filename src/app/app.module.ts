import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './board/dashboard/dashboard.component';
import { ChildrenComponent } from './board/children/children.component';
import { PostsComponent } from './board/posts/posts.component';
import { PostEditComponent } from './board/posts/post-edit/post-edit.component';
import { PostListComponent } from './board/posts/post-list/post-list.component';
import { PostItemComponent } from './board/posts/post-item/post-item.component';
import { FormDirective } from './shared/classes/input.directive';
import { FormsModule } from '@angular/forms';
import { HoldableDirective } from './shared/holdable.directive';
import { ButtonComponent } from './shared/components/deleteButton/button.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ChildrenComponent,
    PostsComponent,
    PostEditComponent,
    PostListComponent,
    PostItemComponent,
    FormDirective,
    HoldableDirective,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

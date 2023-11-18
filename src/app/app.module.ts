import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './board/dashboard/dashboard.component';
import { ChildrenComponent } from './board/children/children.component';
import { PostsComponent } from './board/posts/posts.component';
import { PostEditComponent } from './board/posts/post-edit/post-edit.component';
import { PostListComponent } from './board/posts/post-list/post-list.component';
import { ButtonComponent } from './shared/components/delete-button/delete-button.component';
import { BasicButtonComponent } from './shared/components/basic-button/basic-button.component';
import { FilePickerButtonComponent } from './shared/components/file-picker-button/file-picker-button.component';

import { FormDirective } from './shared/classes/input.directive';
import { PostItemComponent } from './board/posts/post-item/post-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ChildrenComponent,
    PostsComponent,
    PostEditComponent,
    PostListComponent,
    FormDirective,
    ButtonComponent,
    BasicButtonComponent,
    FilePickerButtonComponent,
    PostItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { CommentItemComponent } from './comment/comment-item/comment-item.component';

import { CommentReplyComponent } from './comment/comment-item/comment-reply/comment-reply.component';
import { UserReplyComponent } from './comment/comment-item/comment-reply/user-reply/user-reply.component';
import { FormsModule } from '@angular/forms';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { SuretodeleteComponent } from './suretodelete/suretodelete.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    CommentItemComponent,
    CommentReplyComponent,
    UserReplyComponent,
    CommentEditComponent,
    SuretodeleteComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUser } from 'src/app/app.model';

@Component({
  selector: 'app-user-reply',
  templateUrl: './user-reply.component.html',
  styleUrls: ['./user-reply.component.scss'],
})
export class UserReplyComponent implements OnInit {
  @Output() onReply: EventEmitter<string> = new EventEmitter<string>();
  @Input() replyItem!: CurrentUser;
  @Input() replyCommentUsername!: string;
  @Input() mainCommentUsername!: string;

  content = '';

  constructor() {}

  ngOnInit(): void {
    if (this.mainCommentUsername) {
      this.content = '@' + this.mainCommentUsername + this.content;
    } else {
      this.content = '@' + this.replyCommentUsername + this.content;
    }
  }

  reply() {
    if (this.content) {
      this.onReply.emit(this.content);
    }
  }
}

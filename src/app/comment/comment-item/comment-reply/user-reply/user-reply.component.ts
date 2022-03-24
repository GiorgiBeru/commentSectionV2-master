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
  content = '';

  constructor() {}

  ngOnInit(): void {}

  reply() {
    if (this.content) {
      this.onReply.emit(this.content);
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUser, Reply } from 'src/app/app.model';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
})
export class CommentReplyComponent implements OnInit {
  @Input() replyItem!: Reply;
  @Input() replyCurUser!: CurrentUser;
  @Input() repliesArray!: Reply[];
  @Output() contentEmmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() idEmittedGrandChild: EventEmitter<any> = new EventEmitter<any>();

  userReply: Boolean = false;
  isModalActive = false;
  deleteCommentari: boolean = false;

  constructor() {}

  userReplies() {
    this.userReply = !this.userReply;
  }
  ngOnInit(): void {}

  rearrangeReplies(score: number) {
    this.replyItem.score = score;
    this.repliesArray = this.repliesArray.sort(
      (a: Reply, b: Reply) => b.score - a.score
    );
  }

  handleContent(content: string) {
    this.userReplies();
    this.contentEmmit.emit(content);
  }
  upVote(score: number) {
    score++;
    this.rearrangeReplies(score);
  }
  downVote(score: number) {
    score--;
    this.rearrangeReplies(score);
  }

  deleteComment(id: number) {
    this.deleteCommentari = !this.deleteCommentari;
    this.idEmittedGrandChild.emit(id);
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
}

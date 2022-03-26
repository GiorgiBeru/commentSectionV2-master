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
  @Output() onReplyUpdate: EventEmitter<any> = new EventEmitter<any>();

  userReply = false;
  isModalActive = false;
  deleteCommentari = false;
  isEditActive = false;
  replyContent = '';

  constructor() {}

  toggleIsEditActive() {
    this.isEditActive = !this.isEditActive;
  }

  updateReply() {
    if (this.replyContent) {
      this.onReplyUpdate.emit({
        id: this.replyItem.id,
        updateContent: this.replyContent,
      });
      this.toggleIsEditActive();
    }
  }

  userReplies() {
    this.userReply = !this.userReply;
  }

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
  ngOnInit(): void {
    this.replyContent = this.replyItem.content;
  }
}

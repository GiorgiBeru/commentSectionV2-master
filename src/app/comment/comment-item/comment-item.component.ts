import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commentari, CurrentUser, Reply } from 'src/app/app.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem!: Commentari;
  @Input() curUser!: CurrentUser;
  @Input() commentsArray!: Commentari[];
  @Output() onMainReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() idEmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() replyToDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMainUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCommentReplyUpdate: EventEmitter<any> = new EventEmitter<any>();
  
  deleteCommentari: boolean = false;
  userMainReply = false;
  editContent = '';
  isEditActive = false;
  isModalActive = false;
  n: number = 0;
  

  constructor() {}

  handleReplyUpdate(data: any){
    this.onCommentReplyUpdate.emit(data);
  }

  userReplies() {
    this.userMainReply = !this.userMainReply;
  }

  handleMainReply(content: string) {
    this.onMainReply.emit({ content, id: this.commentItem.id });
    this.userMainReply = false;
  }

  upVote(score: number) {
    score++;
    this.rearrangeComments(score);
  }
  downVote(score: number) {
    score--;
    this.rearrangeComments(score);
  }
  rearrangeComments(score: number) {
    this.commentItem.score = score;
    this.commentsArray = this.commentsArray.sort(
      (a: Commentari, b: Commentari) => b.score - a.score
    );
  }

  toggleEdit() {
    this.isEditActive = !this.isEditActive;
  }

  deleteComment(id: number) {
    this.deleteCommentari = !this.deleteCommentari;
    this.idEmitted.emit(id);
    this.toggleModal();
  }

  handleIdEmittedGrandChild(id: number) {
    this.commentItem.replies.map((reply: Reply, index) => {
      if (reply.id === id) {
        return (this.n = index);
      } else {
        return;
      }
    });
    this.commentItem.replies.splice(this.n, 1);
    this.replyToDelete.emit();
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
  updateMainReply(){
    if (this.editContent) {
      this.onMainUpdate.emit({id: this.commentItem.id, updateContent: this.editContent});
      this.toggleEdit();
    }
  }
  ngOnInit(): void {
    this.editContent = this.commentItem.content;
  }
}

import { Component, OnInit } from '@angular/core';
import { Commentari, CurrentUser, Data, Reply } from '../app.model';
import { StorageService } from '../storage.service';
import { UsersService } from '../users.service';
const commentKey = 'comments';
import { formatDistance } from 'date-fns';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  currentUser!: CurrentUser;
  comments!: Commentari[];
  mainreply: string = '';
  n: number = 0;

  constructor(
    private usersService: UsersService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  refreshStorage() {
    this.storageService.set<Data>(commentKey, {
      currentUser: this.currentUser,
      comments: this.comments,
    });
  }

  async loadUsers() {
    const storageData = this.storageService.get<Data>(commentKey);
    if (storageData) {
      var data: Data | null = storageData;
      this.comments = data.comments;
      this.currentUser = data.currentUser;
      return;
    }
    data = await this.usersService.getUsers();
    this.currentUser = data.currentUser;
    this.comments = data.comments;
    this.refreshStorage();
  }

  HanldeMainReply(data: any) {
    const toReply = this.comments.find((item) => item.id == data.id);
    const newComment: Reply = {
      content: data.content,
      createdAt: formatDistance(Date.now(), new Date()),
      id: this.generateMaxId(),
      replyingTo: toReply?.user?.username ? toReply?.user?.username : '',
      score: 0,
      user: this.currentUser,
    };

    toReply?.replies.push(newComment);
    this.refreshStorage();
  }

  HandleReplyToDelete() {
    this.refreshStorage();
  }

  HandleIdEmitted(id: number) {
    this.comments.map((item: Commentari, index) => {
      if (item.id === id) {
        return (this.n = index);
      } else {
        return;
      }
    });
    this.comments.splice(this.n, 1);
    this.refreshStorage();
  }

  generateMaxId() {
    let id = 1;
    this.comments.forEach((item) => {
      if (item.id > id) id = item.id;
      item.replies.forEach((reply) => {
        if (reply.id > id) id = reply.id;
      });
    });

    return ++id;
  }
  reply() {
    if (this.mainreply) {
      const newComment: Commentari = {
        content: this.mainreply,
        createdAt: formatDistance(Date.now(), new Date()),
        id: this.generateMaxId(),
        score: 0,
        user: this.currentUser,
        replies: [],
      };

      this.comments.push(newComment);

      this.mainreply = '';
      this.refreshStorage();
    }
  }
  handleOnMainUpdate(data: any) {
    this.comments = this.comments.map((comment: Commentari) => {
      if (comment.id === data.id) {
        comment.content = data.updateContent;
      }
      return comment;
    });
  }
  handleCommentReplyUpdate(data: any) {
    console.log(data);
    this.comments.map((comment: Commentari) => {
      comment.replies.map((reply: Reply) => {
        if (reply.id === data.id) {
          reply.content = data.updateContent;
        }
        return reply;
      });
      return comment;
    });
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-suretodelete',
  templateUrl: './suretodelete.component.html',
  styleUrls: ['./suretodelete.component.scss'],
})
export class SuretodeleteComponent implements OnInit {
  @Output() onYesDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onNoDelete: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
  yesDelete() {
    this.onYesDelete.emit();
  }
  noDelete() {
    this.onNoDelete.emit();
  }
  ngOnInit(): void {}
}

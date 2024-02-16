import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Output() commentSubmitted = new EventEmitter<{ comment: string }>();
  comment: string = '';

  submitComment() {
    if (this.comment) {
      this.commentSubmitted.emit({ comment: this.comment });

      this.comment = '';
    }
  }
}



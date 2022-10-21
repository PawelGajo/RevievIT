import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Answer } from '../models/answer';
import { PostActivityComponent } from '../../post/post-activity/post-activity.component';
import { StarRankComponent } from '../../shared/star-rank/star-rank.component';
import { MatDividerModule } from '@angular/material/divider';
import { AnswerReviewedCategoryComponent } from '../answer-reviewed-category/answer-reviewed-category.component';

@Component({
  selector: 'app-answer-detail',
  standalone: true,
  imports: [
    CommonModule,
    PostActivityComponent,
    StarRankComponent,
    MatDividerModule,
    AnswerReviewedCategoryComponent,
  ],
  template: `<div *ngIf="answer" class="answer-wrapper">
    <mat-divider></mat-divider>
    <div class="answer-header">
      <app-star-rank [rank]="answer.rank" label="Overall rank"></app-star-rank>
      <div *ngIf="answer.is_top_answer" class="top-answer">Top Review</div>
    </div>
    <div data-testid="answer-description" class="answer-description">
      {{ answer.description }}
    </div>
    <app-answer-reviewed-category
      *ngFor="let category of answer.reviewed_categories"
      [category]="category"
    ></app-answer-reviewed-category>
    <app-post-activity
      [activity]="answer.author_last_activity"
    ></app-post-activity>
  </div>`,
  styles: [
    `
      .answer-wrapper {
        padding: 1em 2.3em;
      }
      .answer-header {
        padding-top: 0.5em;
        display: flex;
        align-items: center;
        gap: 1.4em;
      }

      .top-answer {
        width: fit-content;
        color: #6abab1;
        padding: 1px 7px;
        border: 1px solid #6abab1;
        border-radius: 3px;
      }
      .answer-description {
        margin-top: 1em;
      }
    `,
  ],
})
export class AnswerDetailComponent {
  @Input() answer!: Answer;
  constructor() {}
}

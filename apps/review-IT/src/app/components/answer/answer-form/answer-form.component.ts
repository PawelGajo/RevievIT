import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PostCategory } from '../../../models/post-category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PostDetail } from '../../../models/post';
import { MatIconModule } from '@angular/material/icon';
import { AnswerFormCategoryComponent } from './answer-form-category/answer-form-category.component';
import { castAbstractControlToFormGroup } from '../../shared/form-utils/form-utils';
import { MatButtonModule } from '@angular/material/button';
import { AnswerService } from '../../../services/answer.service';
import { AnswerCreate } from '../../../models/answer';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    AnswerFormCategoryComponent,
  ],
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss'],
})
export class AnswerFormComponent {
  private fb = inject(FormBuilder);
  private answerService = inject(AnswerService);


  _post: PostDetail;
  categoriesToReview: PostCategory[];;
  availableCategories: PostCategory[];
  selectedCategories: PostCategory[] = [];
  answerForm = this.fb.nonNullable.group({
    description: ['', Validators.required],
    reviewedCategories: this.fb.array([]),
  });

  @Input() set post(value: PostDetail) {
    this._post = value;
    this.categoriesToReview = [...value.categories];
    this.availableCategories = [...value.categories];
  }

  get reviewedCategories() {
    return this.answerForm.get('reviewedCategories') as FormArray;
  }

  submit() {
    const answer: AnswerCreate = {
      description: this.answerForm.get('description')!.value,
      reviewedCategories: this.reviewedCategories.value,
    }
    this.answerService.createAnswer(answer, this._post.id).subscribe((answer)=> console.log(answer));
  }

  addCategoryToReview(categoryId: number) {
    const reviewedCategory = this.fb.group({
      rank: [1, Validators.required],
      category: [categoryId, Validators.required],
      reviewCategoryNodes: this.fb.array([
        this.fb.group({
          type: ['pro'],
          description: ['', Validators.required],
        }),
      ]),
    });
    this.reviewedCategories.push(reviewedCategory);
    this.removeAvailableCategory(categoryId);
    this.addSelectedCategory(categoryId);
  }

  removeCategory(categoryFormIndex: number, categoryId: number) {
    this.reviewedCategories.removeAt(categoryFormIndex);
    this.addAvailableCategory(categoryId);
    this.removeSelectedCategory(categoryId);
  }

  addSelectedCategory(categoryId: number) {
    this.selectedCategories.push(this.getCategoryFromId(categoryId));
  }

  removeSelectedCategory(categoryId: number) {
    this.selectedCategories = this.selectedCategories.filter(
      (item) => item.id !== categoryId
    );
  }

  removeAvailableCategory(categoryId: number) {
    this.availableCategories = this.availableCategories.filter(
      (item) => item.id !== categoryId
    );
  }

  addAvailableCategory(categoryId: number) {
    const category = this.getCategoryFromId(categoryId);
    this.availableCategories.push(category);
  }

  getCategoryFromId(categoryId: number) {
    return this.categoriesToReview.filter((item) => item.id === categoryId)[0];
  }

  castToGroup(control: AbstractControl) {
    return castAbstractControlToFormGroup(control);
  }
}

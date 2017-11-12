import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating } from '../shared/rating';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

	dish: Dish;
  dishcopy = null;
  comment: Comment;
  dishIds: number[];
  prev: number;
  next: number
  ratingForm: FormGroup;
  errMess: string;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Your name is required',
      'minlength': 'Your name must be atleast 2 character long',
      'maxlength': 'Your name cannot be more than 25 characters long'
    },
    'rating': {
      'required': 'Rating is required',
    },
    'comment': {
      'required': 'Your comment is required'
    }
  }

	constructor(private dishservice: DishService,
		private route: ActivatedRoute,
		private location: Location,
    private rt: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
  }

  	ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
        .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
          errmess => this.errMess = <any>errmess);
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }

  	goBack(): void {
  		this.location.back();
  	}

    createForm(): void {
      this.ratingForm = this.rt.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        rating: 5,
        comment: ['', [Validators.required]]
      });

      this.ratingForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
    }

    onValueChanged(data?: any) {
      if(!this.ratingForm) {
        return;
      }
      const form = this.ratingForm;

      for(const field in this.formErrors) {
        this.formErrors[field] = '';

        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

    onSubmit() {
      this.comment = this.prepSaveAuthor();;
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
        .subscribe(dish => this.dish = dish);
      // console.log(this.comment);
      this.ratingForm.reset({
        author: '',
        rating: 5,
        comment: ''
      });
    }

    prepSaveAuthor(): Comment {
      const formModel = this.ratingForm.value;
      
      const saveAuthor: Comment = {
        rating: formModel.rating,
        comment: formModel.comment,
        author: formModel.author,
        date: new Date().toISOString()
      }
      return saveAuthor;
    }

}

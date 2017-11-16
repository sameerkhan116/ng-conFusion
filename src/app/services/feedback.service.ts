import { Injectable } from '@angular/core';
import { ContactType, Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ProcessHTTPMsgService } from './process-httpmsg.service'; 

import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {


  constructor(private restangular: Restangular) { }

  submitFeedback(value: Feedback): Observable<Feedback> {
  	return this.restangular.all('feedback').post(value);
  }

}
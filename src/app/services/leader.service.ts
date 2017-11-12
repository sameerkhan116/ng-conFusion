import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
  	return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
  	return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
  	return this.restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
  }

}
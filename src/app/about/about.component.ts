import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	leaders: Leader[];
  errMess: string;

	selectedLeader: Leader;

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  	this.leaderService.getLeaders()
  		.subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

}

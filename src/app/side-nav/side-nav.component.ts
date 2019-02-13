import { Component, OnInit } from '@angular/core';
import { Planet, planets } from '../models/planets';
import { Observable } from 'rxjs';
import { OrbitStateService } from '../ngrx/orbit/orbit.service';
import { AnimationStateService } from '../ngrx/animation/animation.service';
import { LawStateService } from '../ngrx/law/law.service';

@Component({
  selector: 'kl-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }

}

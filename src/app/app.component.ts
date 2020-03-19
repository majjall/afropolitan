import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from './wordpress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-wordpress-demo';

  events$: Observable<any[]>;

  constructor(private wp: WordpressService) {
    this.events$ = this.wp.getEvents();
  }
}

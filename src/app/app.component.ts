import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonasService } from './services/personas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonasService]
})
export class AppComponent {
  title = 'app';
 

  constructor(private router: Router) {
  //   this.subscription = this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       this.browserRefresh = !this.router.navigated;
  //       if(this.browserRefresh)
  //       {
  //         console.log(this.browserRefresh);
  //       }
  //     }
  // });
  }
}

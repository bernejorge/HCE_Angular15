import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isCollapsed = true;
  constructor(private menuSrv: MenuService) {
    menuSrv.$menuObservable.subscribe(
      {
        next: (state: boolean) => this.setState(state),
      }
    )
  }
  ngOnInit() {
  }

  setState(s: boolean) {
    this.isCollapsed = s;
  }

  clicked = 0;

  select(i: number) {
    this.clicked = i;
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class MenuService {
  private menuSubject = new BehaviorSubject<boolean>(false);
  private collapsedMenu :boolean = false;
  public $menuObservable = this.menuSubject.asObservable();
  constructor() { 

  }

  menuToggle(): void {
    this.collapsedMenu = !this.collapsedMenu;
    this.menuSubject.next(this.collapsedMenu);
  }

}

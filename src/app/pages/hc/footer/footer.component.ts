import { Component, OnInit } from '@angular/core';
import { SideBarOptions } from 'src/app/Models/SideOptions';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  menuOptions!: SideBarOptions;
  
  constructor(private menuSrv: MenuService) { 
    this.getMenuOptions();
  }
  async getMenuOptions() {
    this.menuOptions = await this.menuSrv.getSideBarOptions();
  }

  ngOnInit() {

  }

}

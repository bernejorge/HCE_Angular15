import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isCollapsed = true;
  href!: string;
  subscription: Subscription;
  browserRefresh = false;
  public URL_TO_LOGIN="";
  constructor(private menuSrv: MenuService, private router: Router, private configSrv: ConfigService) {
    menuSrv.$menuObservable.subscribe(
      {
        next: (state: boolean) => this.setState(state),
      }
    )

    this.configSrv.getConfigJson().subscribe(
      (conf:any)=>{
        this.URL_TO_LOGIN = conf.URL_TO_LOGIN;
      }
    );
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !this.router.navigated;
        if (this.browserRefresh) {
          console.log(this.browserRefresh);
        }
        switch (event.url) {
          case "/main/motivo-consulta":
            this.select(1);
            break;

          case "/main/profesionales":
            this.select(2);
            break;

          case "/main/resultados":
            this.select(3);
            break;

          case "/main/medicamentos":
            this.select(4);
            break;

          case "/main/internaciones":
            this.select(5);
            break;

            default:
              this.select(0);
              break;
        }
      }
    });

  }
  ngOnInit() {
    this.href = this.router.url;
  }

  setState(s: boolean) {
    this.isCollapsed = s;
  }

  clicked = 0;

  select(i: number) {
    this.clicked = i;
  }

  onMenuClick() {
    console.log("Click en el menu toggle!");
    this.menuSrv.menuToggle();
  }
  goToLink(url: string){
    window.open(url, "_blank");
}
}

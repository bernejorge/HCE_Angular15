import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent} from '../login/login.component';
import { Login2Component } from '../login2/login2.component';
   

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  
  constructor(private modalService: NgbModal, config: NgbModalConfig) { 
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit() {
  }

  openModal():void {
    console.log("Botoncito clicked");
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
    
  }
  
	open(content: any) {
		this.modalService.open(content);
	}
}

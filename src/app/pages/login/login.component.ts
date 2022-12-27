import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { PersonasService } from '../../services/personas.service';


@Component({
	selector: 'app-login',
	providers: [LoginService],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	
	loginForm = this.fb.group({
		username: [''],
		password: [''],
	  });
	public show = true;
	public mymodalIsOpen:boolean = false;

	constructor(private loginSrv : LoginService, private router:Router,  private fb: FormBuilder, 
				private personaSrv: PersonasService, public activeModal: NgbActiveModal)  {
		
	}

	ngOnInit() {
	}

	showLogin() {
		this.show = true;

	}
	openLogin(value: boolean) {
		console.log("Clickeado");
		this.mymodalIsOpen = value;
		console.log("State = " + this.mymodalIsOpen)
		
	}
	
	ingresar() {
		//definicion del observador
		const LoginObserver={
			next:(x: any)=> {
				console.log(x);
				this.activeModal.close();
				this.router.navigate(['/main']);
			},
			error:(x: { message: string; })=>{
				console.error(x);
				window.alert("Error: " + x.message);				 
			}
			
		}
		console.log(this.loginForm.controls.username.value);
		const userName = this.loginForm.controls.username.value ? this.loginForm.controls.username.value : "";
		const password = this.loginForm.controls.password.value ? this.loginForm.controls.password.value:"";
		this.loginSrv.login(userName, password)
			.subscribe(LoginObserver);
		this.mymodalIsOpen=false;
	}


}

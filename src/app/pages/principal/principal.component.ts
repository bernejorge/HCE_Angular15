import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { PersonasService } from '../../services/personas.service';
import { LoginComponent } from '../login/login.component';
import { RegistrarseModalComponent } from './registrarse-modal/registrarse-modal.component';


@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

	loginForm = this.fb.group({
		username: [''],
		password: [''],
	});
	constructor(private modalService: NgbModal, private loginSrv: LoginService, private router: Router,
				private fb: FormBuilder) {

	}

	ngOnInit() {
	}

	openModal(): void {
		console.log("Botoncito clicked");
		const modalRef = this.modalService.open(LoginComponent);

	}

	ingresar() {
		//definicion del observador
		const LoginObserver = {
			next: (x:any) => {
				console.log(x);
				//this.activeModal.close();
				this.router.navigate(['/main']);
			},
			// error: (x) => {
			// 	console.error(x);
			// 	window.alert("Error: " + x.message);
			// }

		}
		console.log(this.loginForm.controls.username.value);
		this.loginSrv.login(this.loginForm.controls.username.value,
			this.loginForm.controls.password.value)
			.subscribe(LoginObserver);
		//this.mymodalIsOpen=false;
	}

	openModalResgistrar(){
		const modalRef = this.modalService.open(RegistrarseModalComponent, { size: 'lg' });
        

	}

}

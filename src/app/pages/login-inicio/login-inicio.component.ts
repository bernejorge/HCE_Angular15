import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { RegistrarseComponent } from './modales/registrarse/registrarse.component';
import { RegistroExitosoComponent } from './modales/registro-exitoso/registro-exitoso.component';
import { TerminosCondicionesComponent } from './modales/terminos-condiciones/terminos-condiciones.component';
import swal from 'sweetalert2';
import { OlvidoSuPassComponent } from './modales/olvido-su-pass/olvido-su-pass.component';

@Component({
	selector: 'app-login-inicio',
	templateUrl: './login-inicio.component.html',
	styleUrls: ['./login-inicio.component.css']
})
export class LoginInicioComponent implements OnInit {

	@ViewChild('content2') modalReg: any;
	@ViewChild('content') modal: any;
	modalRegRef: any;
	loginForm!: FormGroup;
	string = "";
	aceptaTerminos = false;
	registrase:boolean = true;
	btnText:string = "Registrarse"
	
	constructor(private fb: FormBuilder, private modalService: NgbModal, private loginSrv: LoginService, private router: Router) {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
			password: [''],
		});
		//saber que texto mostrar en el btn de registro y que modal disparar
		this.setRegistro();
	}
	setRegistro() {
		const mail = localStorage.getItem("emailAValidar");
		if (mail == null || mail.length == 0) {
			this.registrase = true;
			this.btnText = "Registrarse";
		}else{
			this.registrase = false;
			this.btnText = "Validar Codigo Temporal";
		}
	}
	ngOnInit() {

	}
	validar():boolean{
		if(!this.aceptaTerminos){
			Swal.fire({
				icon: 'info',
				title: 'Importante.',
				text: "Debe aceptar los Términos y Condiciones para poder ingresar.",				
			   })
			   return false;
		}

		return true;
	}
	ingresar() {
		//definicion del observador
		if(this.validar()){

			const LoginObserver = {
				next: (x: any) => {
					console.log(x);
					//this.activeModal.close();
					this.router.navigate(['/main']);
				},
				// error: (x) => {
				// 	console.error(x);
				// 	window.alert("Error: " + x.message);
				// }
	
			}
			console.log(this.loginForm.controls['username'].value);
			this.loginSrv.login(this.loginForm.controls['username'].value,
				this.loginForm.controls['password'].value)
				.subscribe(LoginObserver);
			//this.mymodalIsOpen=false;
		}
	}

	openModal() {
		if(this.registrase){
			this.modalRegRef = this.modalService.open(RegistrarseComponent);
			this.modalRegRef.result.then((result: any) => {
				if (result) {
	
					const doc = result.controls.docnumber.value;
					const nac = new Date(result.controls.nac.value);
					this.regitrarse(doc, nac);
				}
			}, (reason: any)=>{
				console.log(reason);
				this.setRegistro();
			}
			);
		}else{
			this.router.navigate(['/validar-registro']);
		}
		
	}

	mostrarTerminos(){
		const modalRef = this.modalService.open(TerminosCondicionesComponent, { size: 'lg' });

	}
	regitrarse(doc: string, nac: Date) {
		//definicion del observador
		const RegistrarseObserver = {
			next: (x:any) => {
				//respuesta de exito
				console.log(x);
				//mostrar mensaje de exito, mostrar modal
				const mail = this.obscure_email(x.Email);
				const modalRef = this.modalService.open(RegistroExitosoComponent)
				modalRef.componentInstance.email = mail.toLowerCase();
				modalRef.result.then((result) => {
					this.router.navigate(['/validar-registro']);

				}, (reason) => {
					console.log(reason);
					this.router.navigate(['/validar-registro']);
				});

				;
			},

		}

		this.loginSrv.registarse("1", doc, nac.toISOString())
			.subscribe(RegistrarseObserver);
	}
	resetearRegistro(){
		this.registrase = true;
		
		this.openModal();
	}
	isValidEmail(): boolean {
		
		
		return this.loginForm.controls['username'].valid && this.loginForm.controls['username'].touched;
	}
	openModalOlvidoPass(){
		const modalRef = this.modalService.open(OlvidoSuPassComponent);
	}
	obscure_email(email: string) {
		var parts = email.split("@");
		var name = parts[0];
		var result = name.charAt(0);
		for (var i = 1; i < name.length; i++) {
			result += "*";
		}
		result += name.charAt(name.length - 1);
		result += "@";
		var domain = parts[1];
		result += domain.charAt(0);
		var dot = domain.indexOf(".");
		for (var i = 1; i < dot; i++) {
			result += "*";
		}
		result += domain.substring(dot);

		return result;
	}
}

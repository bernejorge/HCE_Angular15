import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarseComponent } from '../login-inicio/modales/registrarse/registrarse.component';
import { RegistroExitosoComponent } from '../login-inicio/modales/registro-exitoso/registro-exitoso.component';
@Component({
  selector: 'app-validar-registro',
  templateUrl: './validar-registro.component.html',
  styleUrls: ['./validar-registro.component.css']
})
export class ValidarRegistroComponent implements OnInit {

  cForm: FormGroup;


  constructor(private loginSrv: LoginService, private fb: FormBuilder, private router: Router, private modalService: NgbModal) { 
    this.cForm = this.fb.group(
      {
        digito1: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
        digito2: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
        digito3: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
        digito4: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
        digito5: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
        // digito6: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      }
    );
  }

  ngOnInit() {
  }

  validacionDeCodigo() {
      if(this.validarInputs()){
        //consumir servicio
        let stringCode='';
        for (const field in this.cForm.controls) { // 'field' is a string
          console.log(this.cForm.controls[field].value);
          stringCode = stringCode+this.cForm.controls[field].value;
        }
        const codigo = Number(stringCode);
        this.loginSrv.validarCodigo(codigo).subscribe(
          (res:any)=>{
            //codigo respuesta exitosa
            console.log(res);
            if (res.TienePerfil ){
              this.msgValidacionExitoConPerfil();            
            }else{
              this.msgValidacionExito();
            }
            //this.router.navigate(['/generar-password']);
          }
        );
      }else{  
        //mensaje de validacion de datos ingresados
      }

  }

  validarInputs():boolean{

    return true;
  }
  msgValidacionExito() {
   Swal.fire({
     title: 'Validación Exitosa',
     text: 'Ha realizado la validación de manera correcta.',
     icon: 'success',
    }).then((result:any) => {
      // redirectTo generar-password
      this.router.navigate(['/generar-password']);
    })
  }

  openModal(){
    const modalRegRef = this.modalService.open(RegistrarseComponent);
			modalRegRef.result.then((result) => {
				if (result) {
	
					const doc = result.controls.docnumber.value;
					const nac = new Date(result.controls.nac.value);
					this.regitrarse(doc, nac);
				}
			}, (reason)=>{
				console.log(reason);
				//this.setRegistro();
			}
			);
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

  msgValidacionExitoConPerfil() {
    Swal.fire({
      title: 'Validación Exitosa',
      text: 'Ha realizado la validación de manera correcta. Utilice el usuario y contraseña que usa habitualmente en Turnos Online.',
      icon: 'success',
     }).then((result:any) => {
       // redirectTo Login
       this.router.navigate(['/home']);
     })
   }
}

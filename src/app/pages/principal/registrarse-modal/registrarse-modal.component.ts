import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registrarse-modal',
  templateUrl: './registrarse-modal.component.html',
  styleUrls: ['./registrarse-modal.component.css']
})
export class RegistrarseModalComponent implements OnInit {

  resgistrationForm = this.fb.group({
		docnumber: [''],
		nac: [''],
	  });
  
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private loginSrv: LoginService,
            private router: Router) { }

  ngOnInit() {
  }

  regitrarse(){
    //definicion del observador
		const RegistrarseObserver = {
			next: (x:any) => {
        //respuesta de exito
				console.log(x);
				
				this.router.navigate(['/main']);
			},

		}
    const doc = this.resgistrationForm.controls.docnumber.value;
    const nac = this.resgistrationForm.controls.nac.value;
    this.loginSrv.registarse("1", doc, nac)
    .subscribe(RegistrarseObserver);
  }
}

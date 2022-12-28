import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../custom-validators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-generar-password',
  templateUrl: './generar-password.component.html',
  styleUrls: ['./generar-password.component.css']
})
export class GenerarPasswordComponent implements OnInit {

  
  passForm!: FormGroup;
  constructor(private fb:FormBuilder,  private router: Router, private loginSrv: LoginService) { }

  ngOnInit() {
    this.passForm = this.fb.group({
      password: [
        null,
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true 
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),          
          
          Validators.minLength(6)
        ])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])],
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator}
    )
  }

  generar(){
    const password = this.passForm.controls['password'].value;

    const observador= {
      next: (res:any)=>{
        //respuesta de exito.
        console.log(res);
        this.showAlert("Ha generado su contraseña de manera exitosa. ")
      },
      error: (x: any) => {
        //respuesta error
        //tener en cuenta que el mensaje de error lo muestra el intercerptor

      }
    }
    this.loginSrv.registrarPrefilConVinculo(password).subscribe(observador);

  }

  showAlert(m : string) {
    Swal.fire({
     title: 'Contraseña Generada.',
     text: m,
     icon: 'success',
    }).then((result) => {
      // redirectTo Login
      this.router.navigate(['/home']);
    })
 }

}

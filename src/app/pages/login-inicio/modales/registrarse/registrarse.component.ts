import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  resgistrationForm!: FormGroup;
  
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.resgistrationForm = this.fb.group({
      docnumber: ['', Validators.required],
      nac: ['', Validators.required],
    });
  }
  regitrarse(){
    //devuelvo el form con los datos al componente padre
    this.passEntry.emit(this.resgistrationForm);
    this.activeModal.close(this.resgistrationForm);
  }
  
  habilitarBoton():boolean{
    return !(this.resgistrationForm.invalid);
  }

}

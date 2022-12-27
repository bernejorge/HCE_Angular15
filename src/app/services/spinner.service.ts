import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private _spinner = new BehaviorSubject<boolean>(false);
  public spinnerObs$ = this._spinner.asObservable();
  constructor() { }

  mostrarSpinner(){
    console.log("MostrarSpinner");
    this._spinner.next(true);
  }

  esconderSpinner(){
    this._spinner.next(false);
  }

}

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';




@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private modalService: NgbModal) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("ErrorCatchingInterceptor!!!")
        return next.handle(request)
            .pipe(
                catchError(this.manejarError)
            )
        // .catch((err: HttpErrorResponse) => { 
        //     console.log('Caught error', err);
        //     if(err.error){
        //         let m:string="";
        //         if(err.error.Message){
        //             let obj = JSON.parse(err.error.Message);
        //             m = obj.Message;
        //         }else if(err.error.Mensaje){
        //             m= err.error.Mensaje;
        //         }
        //         this.showAlert(m);
        //     }else{
        //         this.showAlert('Ha ocurrido un error inesperado. Intente de nuevo mas tarde');
        //     }

        //     return Observable.throw(err);
        //   });
    }
    manejarError(err: HttpErrorResponse) {
        console.log('Caught error', err);
        let m: string = "";
        if (err.error) {

            if (err.error.Message) {
                try {
                    let obj = JSON.parse(err.error.Message);
                    m = obj.Message;
                } catch (error) {
                    if (typeof err.error.Message === 'string') {
                        m = err.error.Message;
                    } else {
                        m = 'Ha ocurrido un error inesperado. Intente de nuevo mas tarde';
                    }
                }

            } else if (err.error.Mensaje) {
                m = err.error.Mensaje;
            }

        } else {
            m = 'Ha ocurrido un error inesperado. Intente de nuevo mas tarde';
        }
        if (m === null || m.length === 0) {
            m = "Ha ocurrido un error inesperado. Intente nuevamente mas tarde.";
        }
        Swal.fire({
            title: 'Error',
            text: m,
            icon: 'error'
        })
        return throwError(() => err);
    }
    showAlert(m: string | null) {
        if (m === null || m.length === 0) {
            m = "Ha ocurrido un error inesperado. Intente nuevamente mas tarde.";
        }
        Swal.fire({
            title: 'Error',
            text: m,
            icon: 'error'
        })
    }
}
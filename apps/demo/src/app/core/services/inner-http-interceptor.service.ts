import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {AuthService} from '@pnrng/json-form';
import { user } from '../constants/user';

@Injectable({providedIn: 'root'})
export class InnerHttpInterceptor implements HttpInterceptor {


  constructor(private router: Router,
              private toaster: ToastrService, 
              private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap<HttpEvent<any>>(() => null,
        (err: HttpErrorResponse | any) => {
          if (err instanceof HttpErrorResponse && err.status >= 300) {
            this.authService.currentUserValue=user
            let alert = err.error;
            if (alert instanceof Blob) {
              alert = this.blobToString(alert);
            }
            if (alert.message != null) {
              this.toaster.error(alert.message || 'خطایی رخ داد');
            } else {
              this.toaster.error('سامانه قادر به انجام درخواست شما نمی باشد');
            }
          // } else if (err.status === 401 || err.status === 404 || err.status === 500 || err.status === 504 || err.status == 302) {
          //   this.authService.currentUserValue=user
          //   // if (!this.router.url.includes('/auth/login')){
          //   //   this.authService.currentUserValue=undefined
          //   //   this.router.navigateByUrl('/auth/login')
          //   // }
          //     return

          // } else if (err.status === 403) {
            this.toaster.error('شما دسترسی انجام این عملیات را ندارید');
          } else if (err.status === 404) {
            this.toaster.error('درخواست مورد نظر یافت نشد');
          }
        }
      )
    );
  }

  private blobToString(b: Blob | MediaSource) {
    const u = URL.createObjectURL(b);
    const x = new XMLHttpRequest();
    x.open('GET', u, false);
    x.send();
    URL.revokeObjectURL(u);
    return JSON.parse(x.responseText);
  }
}

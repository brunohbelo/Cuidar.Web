import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthGuardService } from '../services/AuthGuard.service';

@Injectable()
export class WebApiInterceptor implements HttpInterceptor {

    constructor(private authGuard: AuthGuardService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req.headers.append('Content-Type', 'application/json');
        req.responseType.concat('json');

        if (req.url.toString().toLowerCase().indexOf('auth/login') === -1) {
            req.headers.append('Authorization', `JWT${this.authGuard.token as string}`);
        }

        return next.handle(req).pipe(tap(
            event => {
            },
            error => {
                alert(error.error.title);
            }
        ));
    }
}

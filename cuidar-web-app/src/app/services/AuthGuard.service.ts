import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    public token: string | undefined;
    public tokenExpirationDate: Date | undefined;

    constructor(private router: Router) {
        this.token = localStorage.getItem('token')?.toString();
        if (this.token) {
            this.tokenExpirationDate = new Date(localStorage.getItem('tokenExpirationDate') ?? '');
        }
    }

    public setToken(token: string, tokenExpirationDate: Date): void {
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate.toString());
        this.token = token;
        this.tokenExpirationDate = new Date(tokenExpirationDate);
    }

    public removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationDate');
    }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const logged = this.token !== undefined
            && this.tokenExpirationDate !== undefined
            && this.tokenExpirationDate > new Date();

        if (!logged) {
            this.router.navigate(['login']);
        }

        return logged;
    }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    public static token: string | undefined;
    public static tokenExpirationDate: Date | undefined;

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const logged = AuthGuardService.token !== undefined
            && AuthGuardService.tokenExpirationDate !== undefined
            && AuthGuardService.tokenExpirationDate > new Date();

        if (!logged) {
            this.router.navigate(['login']);
        }

        return logged;
    }

}

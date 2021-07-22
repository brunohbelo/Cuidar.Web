import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';

@Injectable({
    providedIn: 'root',
})
export class AuthService {


    constructor(private httpClient: HttpClient) {
    }

    public Login(email: string, password: string): Observable<any> {
        return this.httpClient.post(`${AppConfig.API_ENDPOINT}/auth/login`, { username: email, password });
    }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { MainFamilyMember } from '../models/MainFamilyMember';

@Injectable({
    providedIn: 'root',
})
export class MainFamilyMemberSerivce {

    constructor(private httpClient: HttpClient) {
    }

    public postMainFamilyMember(mainFamilyMember: MainFamilyMember): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let mainMemberFamilyPost: any = {};
        Object.assign(mainMemberFamilyPost, mainFamilyMember);
        delete mainMemberFamilyPost.id;

        const headers = new HttpHeaders('application/json');
        return this.httpClient.post<MainFamilyMember>(`${AppConfig.API_ENDPOINT}/mainfamilymembers`, mainFamilyMember, { headers });
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { DependentFamilyMember } from '../models/DependentFamilyMember';
import { FamilyDTO } from '../models/dtos/FamilyDTO';
import { MainFamilyMember } from '../models/MainFamilyMember';

@Injectable({
    providedIn: 'root',
})
export class FamilyService {

    constructor(private httpClient: HttpClient) {
    }

    public postMainFamilyMember(mainFamilyMember: MainFamilyMember, dependentMembers: Array<DependentFamilyMember>): Observable<any> {

        const familyDTO = new FamilyDTO(mainFamilyMember, dependentMembers);

        const headers = new HttpHeaders('header');
        headers.append('Content-Type', 'application/json');

        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<MainFamilyMember>(`${AppConfig.API_ENDPOINT}/familymembers`, familyDTO, { headers, responseType: 'json' });
    }
}

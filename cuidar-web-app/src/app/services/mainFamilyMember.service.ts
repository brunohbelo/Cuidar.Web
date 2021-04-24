import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { getEnumKeyByEnumValue } from '../helpers/enumHelper';
import { FamilyMemberCivilStatus } from '../models/enums/FamilyMemberCivilStatus';
import { FamilyMemberGender } from '../models/enums/FamilyMemberGender';
import { FamilyMemberHousingType } from '../models/enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from '../models/enums/FamilyMemberSchooling';
import { MainFamilyMember } from '../models/MainFamilyMember';

@Injectable({
    providedIn: 'root',
})
export class MainFamilyMemberSerivce {

    constructor(private httpClient: HttpClient) {
    }

    public postMainFamilyMember(mainFamilyMember: MainFamilyMember): Observable<any> {

        debugger;
        // tslint:disable-next-line:prefer-const
        let mainMemberFamilyPost: any = {};
        Object.assign(mainMemberFamilyPost, mainFamilyMember);
        delete mainMemberFamilyPost.id;
        delete mainMemberFamilyPost.familyMemberType;

        mainMemberFamilyPost.housingType = getEnumKeyByEnumValue(FamilyMemberHousingType, mainFamilyMember.housingType);
        mainMemberFamilyPost.civilStatus = getEnumKeyByEnumValue(FamilyMemberCivilStatus, mainFamilyMember.civilStatus);
        mainMemberFamilyPost.schooling = getEnumKeyByEnumValue(FamilyMemberSchooling, mainFamilyMember.schooling);
        mainMemberFamilyPost.gender = getEnumKeyByEnumValue(FamilyMemberGender, mainFamilyMember.gender);

        const headers = new HttpHeaders('header');
        headers.append('Content-Type', 'application/json');
        return this.httpClient.post<MainFamilyMember>(`${AppConfig.API_ENDPOINT}/mainfamilymembers`, mainMemberFamilyPost
            , {
                headers, responseType: 'json'
            });
    }
}

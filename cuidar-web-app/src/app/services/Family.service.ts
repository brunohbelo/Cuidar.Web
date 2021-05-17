import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { DependentFamilyMember } from '../models/DependentFamilyMember';
import { FamilyDTO } from '../models/dtos/FamilyDTO';
import { FamilySearchDTO } from '../models/dtos/FamilySearchDTO';
import { MainFamilyMember } from '../models/MainFamilyMember';

@Injectable({
    providedIn: 'root',
})
export class FamilyService {

    constructor(private httpClient: HttpClient) {
    }

    public postMainFamilyMember(mainFamilyMember: MainFamilyMember, dependentMembers: Array<DependentFamilyMember>): Observable<any> {

        const familyDTO = new FamilyDTO(mainFamilyMember, dependentMembers);
        return this.httpClient.post<MainFamilyMember>(`${AppConfig.API_ENDPOINT}/familymembers`, familyDTO);

    }

    public getAllFamilies(pageNumber: number): Observable<FamilySearchDTO> {
        return this.httpClient.get<FamilySearchDTO>(`${AppConfig.API_ENDPOINT}/familymembers/search?page=${pageNumber}&size=10`);
    }

    public getFamilyByName(name: string, pageNumber: number): Observable<FamilySearchDTO> {
        return this.httpClient.get<FamilySearchDTO>(`${AppConfig.API_ENDPOINT}/familymembers/search?page=${pageNumber}&size=10&fullName=${name}`);
    }
}

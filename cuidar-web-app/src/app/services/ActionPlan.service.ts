import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { FamilyActionPlanDTO } from '../models/dtos/FamilyActionPlanDTO';

@Injectable({
    providedIn: 'root'
})
export class ActionPlanService {

    actionPlan = new BehaviorSubject<FamilyActionPlanDTO | null>(null);

    constructor(private httpClient: HttpClient) {
    }

    public LoadActionPlan(mainMemberId: string): Observable<FamilyActionPlanDTO> {
        return this.httpClient.get<FamilyActionPlanDTO>(`${AppConfig.API_ENDPOINT}/familyactionplan/${mainMemberId}/actions`);
    }


}

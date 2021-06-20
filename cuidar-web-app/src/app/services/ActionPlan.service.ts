import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { getEnumKeyByEnumValue } from '../helpers/enumHelper';
import { FamilyActionPlanDTO } from '../models/dtos/FamilyActionPlanDTO';
import { FamilyActionPlanItemCreationDTO } from '../models/dtos/FamilyActionPlanItemCreationDTO';
import { FamilyMemberNoYesFlag } from '../models/enums/FamilyMemberNoYesFlag';

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

    public InsertActionPlanTask(mainMemberId: string, actionPlanTask: FamilyActionPlanItemCreationDTO): Observable<void>{
        actionPlanTask.isAssistentTask = getEnumKeyByEnumValue(FamilyMemberNoYesFlag, actionPlanTask.isAssistentTask);
        return this.httpClient.post<void>(
            `${AppConfig.API_ENDPOINT}/familyactionplan/${mainMemberId}/create`,
            actionPlanTask
        );
    }


}

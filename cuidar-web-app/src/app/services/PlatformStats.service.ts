import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { FamiliesStatsDTO } from '../models/dtos/FamiliesStatsDTO'

@Injectable({
    providedIn: 'root'
})
export class PlatformStats{

    constructor(private httpClient: HttpClient) {
    }

    public getFamiliesStats(): Observable<FamiliesStatsDTO> {
        return this.httpClient.get<FamiliesStatsDTO>(`${AppConfig.API_ENDPOINT}/stats/families`);
    }
}

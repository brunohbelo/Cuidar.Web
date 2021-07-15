import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';

@Injectable({
    providedIn: 'root'
})
export class FamilySyndicanceService{

    constructor(private httpClient: HttpClient) {
    }

    public approveFamilySindicance(mainMemberId: string, syndicationNotes: string): Observable<void> {
        return this.httpClient.post<void>(`${AppConfig.API_ENDPOINT}/syndication/approve/${mainMemberId}`, { syndicationNotes });
    }

    public reproveFamilySindicance(mainMemberId: string, syndicationNotes: string): Observable<void> {
        return this.httpClient.post<void>(`${AppConfig.API_ENDPOINT}/syndication/reprove/${mainMemberId}`, { syndicationNotes });
    }

    public promoteFamilySindicance(mainMemberId: string, syndicationNotes: string): Observable<void>{
        return this.httpClient.post<void>(`${AppConfig.API_ENDPOINT}/syndication/promote/${mainMemberId}`, { syndicationNotes });
    }

    public suspendFamilySindicance(mainMemberId: string, syndicationNotes: string): Observable<void>{
        return this.httpClient.post<void>(`${AppConfig.API_ENDPOINT}/syndication/suspend/${mainMemberId}`, { syndicationNotes });
    }
}

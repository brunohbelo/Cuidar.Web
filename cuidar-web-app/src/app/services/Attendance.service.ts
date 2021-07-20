import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { AttendanceDTO } from '../models/dtos/AttendenceDTO';
import { FamilyAttendanceDTO as FamilyAttendanceHistoryDTO } from '../models/dtos/FamilyAtendanceDTO';

@Injectable({
    providedIn: 'root',
})
export class AttendenceService {

    constructor(private httpClient: HttpClient) {
    }

    public registerAttendance(mainFamilyMemberId: string, attendance: AttendanceDTO): Observable<any> {

        return this.httpClient.post<AttendanceDTO>(`${AppConfig.API_ENDPOINT}/attendance/${mainFamilyMemberId}/register`, attendance);
    }

    public getAttendanceHistory(mainFamilyMemberId: string, pageNumber: number): Observable<FamilyAttendanceHistoryDTO> {
        return this.httpClient.get<FamilyAttendanceHistoryDTO>(`${AppConfig.API_ENDPOINT}/attendance/${mainFamilyMemberId}/history?page=${pageNumber}&size=10`);
    }
}

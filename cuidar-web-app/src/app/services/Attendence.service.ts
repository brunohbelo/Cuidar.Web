import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../appConfig';
import { AttendanceDTO } from '../models/dtos/AttendenceDTO';

@Injectable({
    providedIn: 'root',
})
export class AttendenceService {

    constructor(private httpClient: HttpClient) {
    }

    public registerAttendance(mainFamilyMemberId: string, attendance: AttendanceDTO): Observable<any> {

        return this.httpClient.post<AttendanceDTO>(`${AppConfig.API_ENDPOINT}/attendance/${mainFamilyMemberId}/register`, attendance);
    }

    public getAttendanceHistory(mainFamilyMemberId: string, pageNumber: number): Observable<AttendanceDTO> {
        return this.httpClient.get<AttendanceDTO>(`${AppConfig.API_ENDPOINT}/attendance/${mainFamilyMemberId}/history?page=${pageNumber}&size=10`);
    }
}

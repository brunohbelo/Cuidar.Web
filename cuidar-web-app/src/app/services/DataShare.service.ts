import { Injectable } from '@angular/core';
import { FamilyDTO } from '../models/dtos/FamilyDTO';
import { MainFamilyMember } from '../models/MainFamilyMember';

@Injectable({
    providedIn: 'root'
})
export class DataShareService {
    family: FamilyDTO | undefined;
}

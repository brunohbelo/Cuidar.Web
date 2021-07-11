import { Injectable } from '@angular/core';
import { FamilyDTO } from '../models/dtos/FamilyDTO';

@Injectable({
    providedIn: 'root'
})
export class DataShareService {
    family: FamilyDTO | undefined;
}

import { FamilyMemberGender } from '../enums/FamilyMemberGender';
import { FamiliesGroupedAgesDTO } from './FamiliesGroupedAgesDTO';

export class FamiliesGroupedGendersAndAgesDTO {
    constructor() {
        this.gender = FamilyMemberGender.NoGender;
        this.count = 0;
        this.groupedAges = new Array<FamiliesGroupedAgesDTO>();
    }

    public gender: FamilyMemberGender;
    public count: number;
    public groupedAges: Array<FamiliesGroupedAgesDTO>;
}

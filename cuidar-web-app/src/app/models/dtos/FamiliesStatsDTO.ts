import { FamiliesGroupedGendersAndAgesDTO } from "./FamiliesGroupedGendersAndAgesDTO";

export class FamiliesStatsDTO {
    constructor() {
        this.familiesCount = 0;
        this.familyMembersCount = 0;
        this.pendingApprovalCount = 0;
        this.groupedGendersAndAges = new Array<FamiliesGroupedGendersAndAgesDTO>();
        this.lastMonthFamiliesCount = 0;
        this.expiredFamiliesCount = 0;
    }

    public familiesCount: number;
    public familyMembersCount: number;
    public pendingApprovalCount: number;
    public lastMonthFamiliesCount: number;
    public expiredFamiliesCount: number;
    public groupedGendersAndAges:  Array<FamiliesGroupedGendersAndAgesDTO>;
    
}

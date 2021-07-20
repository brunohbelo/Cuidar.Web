export class FamilyAttendanceDTO {
    public currentPage!: number;
    public totalItems!: number;
    public totalPages!: number;
    public attendances = new Array<FamilyAttendanceResponse>();
}

export class FamilyAttendanceResponse {
    public attendanceDateTime!: Date;
    public notes!: string;
    public linkedFamilyMembersSummary!: string;
    public linkedActionPlanItemsSummary!: string;
}

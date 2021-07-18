export class AttendanceDTO {
    attendanceDateTime!: Date;
    notes!: string;
    linkedFamilyMembers = new Array<AttendanceLinkedFamilyMemberDTO>();
    linkedActionPlanItems = new Array<AttendanceLinkedActionDTO>();
}

export class AttendanceLinkedActionDTO {
    constructor(id: string, description: string) {
        this.actionPlanItemId = id;
        this.description = description;
    }
    actionPlanItemId!: string;
    description!: string;
}

export class AttendanceLinkedFamilyMemberDTO {
    constructor(id: string, name: string) {
        this.familyMemberId = id,
        this.name = name;
    }
    familyMemberId!: string;
    name!: string;
}

import { FamilyMemberNoYesFlag } from '../enums/FamilyMemberNoYesFlag';

export class FamilyActionPlanItemDTO {

    description!: string;
    dueDate!: Date;
    // tslint:disable-next-line:variable-name
    referencedFamilyMember_Id!: string;
    // tslint:disable-next-line:variable-name
    referencedFamilyMember_Name!: string;
    isAssistentTask!: FamilyMemberNoYesFlag;
    done!: FamilyMemberNoYesFlag ;
    systemRegistrationDate!: Date;
}


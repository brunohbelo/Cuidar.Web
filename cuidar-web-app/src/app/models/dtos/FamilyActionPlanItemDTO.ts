import { FamilyMemberNoYesFlag } from '../enums/FamilyMemberNoYesFlag';

export class FamilyActionPlanItemDTO {

    description!: string;
    dueDate!: Date;
    isAssistentTask!: FamilyMemberNoYesFlag;
    done!: FamilyMemberNoYesFlag ;
    systemRegistrationDate!: Date;
}


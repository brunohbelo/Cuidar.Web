import { FamilyMemberNoYesFlag } from '../enums/FamilyMemberNoYesFlag';

export class FamilyActionPlanItemCreationDTO {
    description!: string;
    dueDate!: Date | undefined | null;
    referencedFamilyMemberId!: string;
    isAssistentTask!: string;
}

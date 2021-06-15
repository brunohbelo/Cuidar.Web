import { FamilyActionPlanItemDTO } from './FamilyActionPlanItemDTO';

export class FamilyActionPlanDTO {

    mainFamilyMemberId!: string;
    actionItemsCount!: number;
    actionList!: Array<FamilyActionPlanItemDTO>;
}

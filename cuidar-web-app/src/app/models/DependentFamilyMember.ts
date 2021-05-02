import { FamilyMemberLinkType } from './enums/FamilyMemberLinkType';
import { FamilyMemberType } from './enums/FamilyMemberType';
import { FamilyMember } from './FamilyMember';
import { MainFamilyMember } from './MainFamilyMember';

export class DependentFamilyMember extends FamilyMember {

    constructor(mainFamilyMember: MainFamilyMember) {
        super();
        this.mainFamilyMember = mainFamilyMember;
        this.familyMemberType = FamilyMemberType.Dependent;
    }

    public linkTypeToMainMember!: FamilyMemberLinkType;
    public mainFamilyMember: MainFamilyMember;
}

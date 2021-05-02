import { DependentFamilyMember } from '../DependentFamilyMember';
import { MainFamilyMember } from '../MainFamilyMember';
import { DependentFamilyMemberDTO } from './DepententFamilyMemberDTO';
import { MainFamilyMemberDTO } from './MainFamilyMemberDTO';

export class FamilyDTO {

    constructor(mainFamilyMember: MainFamilyMember, dependentMembers: Array<DependentFamilyMember>) {
        this.mainFamilyMember = new MainFamilyMemberDTO(mainFamilyMember);
        this.dependentMembers = dependentMembers.map(x => new DependentFamilyMemberDTO(x));

    }

    public mainFamilyMember: MainFamilyMemberDTO;
    public dependentMembers: Array<DependentFamilyMemberDTO>;
}

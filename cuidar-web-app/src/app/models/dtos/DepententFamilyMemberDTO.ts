import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { DependentFamilyMember } from '../DependentFamilyMember';
import { FamilyMemberLinkType } from '../enums/FamilyMemberLinkType';
import { FamilyMemberDTO } from './FamilyMemberDTO';


export class DependentFamilyMemberDTO extends FamilyMemberDTO {

    public constructor(dependentFamilyMember: DependentFamilyMember) {
        super(dependentFamilyMember);
        this.linkTypeToMainMember = getEnumKeyByEnumValue(FamilyMemberLinkType, dependentFamilyMember.linkTypeToMainMember);
    }

    public linkTypeToMainMember: string;
}

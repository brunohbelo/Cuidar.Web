import { DependentFamilyMemberDTO } from './dtos/DepententFamilyMemberDTO';
import { FamilyMemberGender } from './enums/FamilyMemberGender';
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

    public static fromDTO(dto: DependentFamilyMemberDTO, mainFamilyMeber: MainFamilyMember): DependentFamilyMember {
        const member = new DependentFamilyMember(mainFamilyMeber);
        member.birthDate = dto.birthDate;
        member.documentId = dto.documentId;
        member.fullName = dto.fullName;
        member.occupation = dto.occupation;
        member.gender = FamilyMemberGender[dto.gender as keyof typeof FamilyMemberGender];
        member.linkTypeToMainMember = FamilyMemberLinkType[dto.linkTypeToMainMember as keyof typeof FamilyMemberLinkType];

        return member;
    }
}

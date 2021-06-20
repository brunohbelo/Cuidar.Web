import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamilyMemberGender } from '../enums/FamilyMemberGender';
import { FamilyMember } from '../FamilyMember';

export class FamilyMemberDTO {
    constructor(familyMember: FamilyMember) {
        this.id = familyMember.id;
        this.birthDate = familyMember.birthDate;
        this.documentId = familyMember.documentId;
        this.gender = getEnumKeyByEnumValue(FamilyMemberGender, familyMember.gender);
        this.fullName = familyMember.fullName;
        this.occupation = familyMember.occupation;
    }

    public id: string;
    public birthDate: Date | undefined;
    public documentId: string;
    public gender: string;
    public fullName: string;
    public occupation: string;
}

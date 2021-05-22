import { FamilyMemberDTO } from './dtos/FamilyMemberDTO';
import { BaseObject } from './enums/BaseObject';
import { FamilyMemberGender } from './enums/FamilyMemberGender';
import { FamilyMemberType } from './enums/FamilyMemberType';

export class FamilyMember extends BaseObject {

    constructor() {
        super();
        this.fullName = '';
        this.gender = FamilyMemberGender.NoGender;
        this.occupation = '';
        this.documentId = '';
    }

    public birthDate: Date | undefined;
    public documentId: string;
    public gender: FamilyMemberGender;
    public fullName: string;
    public occupation: string;
    public familyMemberType!: FamilyMemberType;

}

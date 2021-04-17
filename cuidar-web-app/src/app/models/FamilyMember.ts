import { FamilyMemberGender } from './enums/FamilyMemberGender';

export class FamilyMember {

    constructor() {
        this.fullName = '';
        this.gender = FamilyMemberGender.NoGender;
        this.occupation = '';
    }

    public birthDate: Date | undefined;

    public fullName: string;

    public gender: FamilyMemberGender;

    public occupation: string;

}

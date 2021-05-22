import { MainFamilyMemberDTO } from './dtos/MainFamilyMemberDTO';
import { FamilyMemberCivilStatus } from './enums/FamilyMemberCivilStatus';
import { FamilyMemberGender } from './enums/FamilyMemberGender';
import { FamilyMemberHousingType } from './enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from './enums/FamilyMemberSchooling';
import { FamilyMemberType } from './enums/FamilyMemberType';
import { FamilyMember } from './FamilyMember';

export class MainFamilyMember extends FamilyMember {

    constructor() {
        super();
        this.familyMemberType = FamilyMemberType.Main;

        this.addressPostalCode = '';
        this.addressStreetName = '';
        this.addressStreetNumber = '';
        this.addressCity = '';
        this.addressState = '';
        this.civilStatus = FamilyMemberCivilStatus.Single;
        this.schooling = FamilyMemberSchooling.Basic;
        this.housingType = FamilyMemberHousingType.Rent;
        this.addressStreetComplement = '';
        this.contactPhoneNumber = '';
        this.contactEmail = '';
        this.housingTypeNotes = '';
        this.economicSituationNotes = '';
        this.socialAssistenceNeedsNotes = '';
    }

    public addressPostalCode: string;
    public addressStreetName: string;
    public addressStreetNumber!: string;
    public addressCity: string;
    public addressState: string;
    public addressStreetComplement: string;
    public civilStatus: FamilyMemberCivilStatus;
    public schooling: FamilyMemberSchooling;
    public contactPhoneNumber: string;
    public contactEmail: string;
    public housingType: FamilyMemberHousingType;
    public housingTypeNotes: string;
    public economicSituationNotes: string;
    public socialAssistenceNeedsNotes: string;


    public static fromDTO(dto: MainFamilyMemberDTO): MainFamilyMember {

        const member = new MainFamilyMember();
        member.birthDate = dto.birthDate;
        member.documentId = dto.documentId;
        member.fullName = dto.fullName;
        member.occupation = dto.occupation;
        member.gender = FamilyMemberGender[dto.gender as keyof typeof FamilyMemberGender];
        member.addressPostalCode = dto.addressPostalCode;
        member.addressStreetName = dto.addressStreetName;
        member.addressStreetNumber = dto.addressStreetNumber;
        member.addressCity = dto.addressCity;
        member.addressState = dto.addressState;
        member.civilStatus = FamilyMemberCivilStatus[dto.civilStatus as keyof typeof FamilyMemberCivilStatus];
        member.schooling = FamilyMemberSchooling[dto.schooling as keyof typeof FamilyMemberSchooling];
        member.housingType = FamilyMemberHousingType[dto.housingType as keyof typeof FamilyMemberHousingType];
        member.addressStreetComplement = dto.addressStreetComplement;
        member.contactPhoneNumber = dto.contactPhoneNumber;
        member.contactEmail = dto.contactPhoneNumber;
        member.housingTypeNotes = dto.housingTypeNotes;
        member.economicSituationNotes = dto.economicSituationNotes;
        member.socialAssistenceNeedsNotes = dto.socialAssistenceNeedsNotes;
        return member;
    }
}

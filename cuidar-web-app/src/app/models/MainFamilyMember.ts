import { FamilyMemberCivilStatus } from './enums/FamilyMemberCivilStatus';
import { FamilyMemberHousingType } from './enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from './enums/FamilyMemberSchooling';
import { FamilyMemberType } from './enums/FamilyMemberType';
import { FamilyMember } from './FamilyMember';

export class MainFamilyMember extends FamilyMember {

    constructor() {
        super();
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
        this.economicSituationNotes =  '';
        this.familyMemberType = FamilyMemberType.Main;
    }

    public addressPostalCode: string;
    public addressStreetName: string;
    public addressStreetNumber!: string;
    public addressCity: string;
    public addressState: string;
    public civilStatus: FamilyMemberCivilStatus;
    public schooling: FamilyMemberSchooling;

    public addressStreetComplement: string;
    public contactPhoneNumber: string;
    public contactEmail: string;
    public housingType: FamilyMemberHousingType;
    public housingTypeNotes: string;
    public economicSituationNotes: string;
}

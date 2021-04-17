import { FamilyMemberCivilStatus } from './enums/FamilyMemberCivilStatus';
import { FamilyMemberHousingType } from './enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from './enums/FamilyMemberSchooling';
import { FamilyMember } from './FamilyMember';

export class MainFamilyMember extends FamilyMember {

    constructor() {
        super();
        this.documentId = '';
        this.addressPostalCode = '';
        this.addressStreetName = '';
        this.addressStreetNumber = '';
        this.addressCity = '';
        this.addressState = '';
        this.civilStatus = FamilyMemberCivilStatus.Single;
        this.schooling = FamilyMemberSchooling.Basic;
        this.addressStreetComplement = '';
        this.contactPhoneNumber = '';
        this.contactEmail = '';
        this.housingTypeNotes = '';
        this.economicSituationNotes =  '';
    }

    documentId: string;
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
    public housingType: FamilyMemberHousingType | undefined;
    public housingTypeNotes: string;
    public economicSituationNotes: string;

}

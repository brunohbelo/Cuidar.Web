import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamilyMemberCivilStatus } from '../enums/FamilyMemberCivilStatus';
import { FamilyMemberHousingType } from '../enums/FamilyMemberHousingType';
import { FamilyMemberNoYesFlag } from '../enums/FamilyMemberNoYesFlag';
import { FamilyMemberSchooling } from '../enums/FamilyMemberSchooling';
import { FamilyStatus } from '../enums/FamilyStatus';
import { MainFamilyMember } from '../MainFamilyMember';
import { FamilyMemberDTO } from './FamilyMemberDTO';

export class MainFamilyMemberDTO extends FamilyMemberDTO {

    constructor(mainFamilyMeber: MainFamilyMember) {
        super(mainFamilyMeber);

        this.addressPostalCode = mainFamilyMeber.addressPostalCode;
        this.addressStreetName = mainFamilyMeber.addressStreetName;
        this.addressStreetNumber = mainFamilyMeber.addressStreetNumber;
        this.addressCity = mainFamilyMeber.addressCity;
        this.addressState = mainFamilyMeber.addressState;
        this.addressStreetComplement = mainFamilyMeber.addressStreetComplement;
        this.civilStatus = getEnumKeyByEnumValue(FamilyMemberCivilStatus, mainFamilyMeber.civilStatus);
        this.schooling = getEnumKeyByEnumValue(FamilyMemberSchooling, mainFamilyMeber.schooling);
        this.contactPhoneNumber = mainFamilyMeber.contactPhoneNumber;
        this.contactEmail = mainFamilyMeber.contactEmail;
        this.housingType = getEnumKeyByEnumValue(FamilyMemberHousingType, mainFamilyMeber.housingType);
        this.housingTypeNotes = mainFamilyMeber.housingTypeNotes;
        this.economicSituationNotes = mainFamilyMeber.economicSituationNotes;
        this.socialAssistenceNeedsNotes = mainFamilyMeber.socialAssistenceNeedsNotes;
        this.assistenceDueDate = mainFamilyMeber.assistenceDueDate;
        this.religionNotes = mainFamilyMeber.religionNotes;
        this.baptizedChildren =  getEnumKeyByEnumValue(FamilyMemberNoYesFlag, mainFamilyMeber.baptizedChildren);
    }

    public addressPostalCode: string;
    public addressStreetName: string;
    public addressStreetNumber: string;
    public addressCity: string;
    public addressState: string;
    public addressStreetComplement: string;
    public civilStatus: string;
    public schooling: string;
    public contactPhoneNumber: string;
    public contactEmail: string;
    public housingType: string;
    public housingTypeNotes: string;
    public economicSituationNotes: string;
    public socialAssistenceNeedsNotes: string;
    public systemRegistrationDate: Date | undefined;
    public assistenceDueDate: Date | undefined;
    public religionNotes: string;
    public generalStatus!: FamilyStatus;
    public baptizedChildren: string;
}

import { FamilyStatus } from '../enums/FamilyStatus';

export class FamilySearchDTO {
    currentPage!: number;
    totalItems!: number;
    totalPages!: number;
    families!: Array<FamilyMemberFamilySearchResponse>;
}

export class FamilyMemberFamilySearchResponse {
    id!: string;
    fullName!: string;
    documentId!: number;
    generalStatus!: FamilyStatus;
}

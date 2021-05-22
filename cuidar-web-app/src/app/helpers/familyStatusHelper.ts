import { FamilyStatus } from '../models/enums/FamilyStatus';

export class FamilyStatusHelper {

    public static getStatusCollor(status: FamilyStatus): any {
        const color = { 'background-color': '' };
        switch (status) {
            case FamilyStatus.Active:
                color['background-color'] = 'rgba(98,217,79,0.5)';
                break;
            case FamilyStatus.Reproved:
                color['background-color'] = 'rgba(228,96,96,0.5)';
                break;
            case FamilyStatus.PendingApproval:
                color['background-color'] = 'rgba(237,167,103,0.5)';
                break;
            case FamilyStatus.Promoted:
                color['background-color'] = 'rgba(147,120,255,0.5)';
                break;
            case FamilyStatus.Suspended:
                color['background-color'] = 'rgba(228,96,96,0.2)';
                break;
        }

        return color;
    }

    public static getFamilyStatus(status: string): FamilyStatus {
        const statusEnum = FamilyStatus[status as keyof typeof FamilyStatus];
        return statusEnum;
    }
}

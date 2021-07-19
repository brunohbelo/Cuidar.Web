import { PlatformRecentStatsByMonthDTO } from "./PlatformRecentStatsByMonthDTO";

export class PlatformRecentStatsDTO {
    constructor() {
        this.totalCount = 0;
        this.recentCount = 0;
        this.groupedMonthlyCount = new Array<PlatformRecentStatsByMonthDTO>();
    }

    public totalCount: number;
    public recentCount: number;
    public groupedMonthlyCount:  Array<PlatformRecentStatsByMonthDTO>;
    
}

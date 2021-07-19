import { Component, OnInit, Input } from '@angular/core';
import { PlatformRecentStatsDTO } from 'src/app/models/dtos/PlatformRecentStatsDTO';
import { PlatformStats } from 'src/app/services/PlatformStats.service';

 @Component({
  selector: 'app-platform-stats-attendances',
  templateUrl: './platform-stats-attendances.component.html',
  styleUrls: ['./platform-stats-attendances.component.scss']
})
export class PlatformStatsAttendanceComponent implements OnInit {
  
  public attendancesStats!: PlatformRecentStatsDTO;

  @Input()
  statsType: string = 'Attendance';
  @Input()
  title: string = "Atendimentos";
  
  constructor(private platformStatsService: PlatformStats) {
  }

  ngOnInit(): void {

    this.GetAttendancesStats();

  }

  public GetAttendancesStats(): void {
    this.platformStatsService.getStatsByType(this.statsType).subscribe({
      next: (data) => {
        this.chartData = [];
        this.attendancesStats = data;
        this.attendancesStats.groupedMonthlyCount.forEach(obj => {
          this.chartData.push({name: obj.month, value: obj.count});
        });
      }
    });
  } 
  
  chartData = [
    { name: '', value: 0 }
    ];

  colorScheme = {
    domain: ['#A290EC', '#A290EC', '#AAAAAA']
  };
}
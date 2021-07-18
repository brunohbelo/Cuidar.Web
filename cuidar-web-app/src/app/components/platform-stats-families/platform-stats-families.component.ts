import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamiliesGroupedGendersAndAgesDTO } from 'src/app/models/dtos/FamiliesGroupedGendersAndAgesDTO';
import { FamiliesStatsDTO } from 'src/app/models/dtos/FamiliesStatsDTO';
import { FamilyMemberGender } from 'src/app/models/enums/FamilyMemberGender';
import { PlatformStats } from 'src/app/services/PlatformStats.service';

 @Component({
  selector: 'app-platform-stats-families',
  templateUrl: './platform-stats-families.component.html',
  styleUrls: ['./platform-stats-families.component.scss']
})
export class PlatformStatsFamiliesComponent implements OnInit {
  
  public familiesStats!: FamiliesStatsDTO;

  public adultsCount: number;
  public childrenCount: number;

  public adultsByGender!: Map<FamilyMemberGender, number>;
  public childrenByGender!: Map<FamilyMemberGender, number>;

  panelOpenState = false;
  
  constructor(private platformStatsService: PlatformStats) {
    this.adultsCount = 0;
    this.childrenCount = 0;
    this.adultsByGender = new Map<FamilyMemberGender, number>();
    this.childrenByGender = new Map<FamilyMemberGender, number>();
  }

  ngOnInit(): void {

    this.GetFamiliesStats();

  }

  public GetFamiliesStats(): void {
    this.platformStatsService.getFamiliesStats().subscribe({
      next: (data) => {
        this.familiesStats = data;
        this.familiesStats.groupedGendersAndAges.forEach(obj => {
          obj.groupedAges.forEach(objAges => {
            var currentNumber: number;

            if (objAges.age > 18) {
              this.adultsCount += objAges.count;
              let currentCount: number = 0;
              // add no map de adulto
              if (this.adultsByGender.has(obj.gender)){
                currentCount = this.adultsByGender.get(obj.gender) ?? 0;
              }

              this.adultsByGender.set(obj.gender, objAges.count + currentCount);
            }
            else{
              this.childrenCount += objAges.count;

              let currentCount: number = 0;
              // add no map de adulto
              if (this.childrenByGender.has(obj.gender)){
                currentCount = this.childrenByGender.get(obj.gender) ?? 0;
              }
              
              this.childrenByGender.set(obj.gender, objAges.count + currentCount);
            }

            this.setChartData(objAges.age, objAges.count);
          });
        });
      }
    });
  } 
   setChartData(age: number, count: number) {

      var index: number = 0;

      if (age <= 5){
        index = 0;
      }else if(age <= 10){
        index = 1;
      }else if(age <= 17){
        index = 2;
      }else if(age <= 30){
        index = 3;
      }else{
        index = 4;
      }      

      this.chartData[index].value = this.chartData[index].value + count;
   }
  
  public GetGenderText(value: string): string {
    return FamilyMemberGender[value as keyof typeof FamilyMemberGender];
  }

  chartData = [
    { name: '0-5', value: 0 },
    { name: '6-10', value: 0 },
    { name: '10-17', value: 0 },
    { name: '18-30', value: 0 },
    { name: '31+', value: 0 }
  ];

  colorScheme = {
    domain: ['#A290EC', '#A290EC', '#AAAAAA']
  };
}
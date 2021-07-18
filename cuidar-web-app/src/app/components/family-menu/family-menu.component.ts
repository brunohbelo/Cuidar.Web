import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { FamilyActionPlanItemDTO } from 'src/app/models/dtos/FamilyActionPlanItemDTO';
import { FamilyDTO } from 'src/app/models/dtos/FamilyDTO';
import { FamilyMemberNoYesFlag } from 'src/app/models/enums/FamilyMemberNoYesFlag';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { ActionPlanService } from 'src/app/services/ActionPlan.service';
import { DataShareService } from 'src/app/services/DataShare.service';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-family-menu',
  templateUrl: './family-menu.component.html',
  styleUrls: ['./family-menu.component.scss']
})
export class FamilyMenuComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private dataShare: DataShareService, private actionPlanService: ActionPlanService, private familyService: FamilyService) {
    this.dependentMembers = new Array<DependentFamilyMember>();
  }

  private familyMemberNoYesFlag = FamilyMemberNoYesFlag;
  public familyStatusHelper = FamilyStatusHelper;
  public mainFamilyMemberId!: string;
  public dependentMembers!: Array<DependentFamilyMember>;
  public mainFamilyMember!: MainFamilyMember;
  public family!: FamilyDTO;

  public actionPlanTaskList = new Array<FamilyActionPlanItemDTO>();

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id => {
      if (this.dataShare.family) {

        this.mainFamilyMemberId = id;
        this.family = this.dataShare.family;
        this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
        this.family.dependentMembers.forEach(x => {
          this.dependentMembers.push(DependentFamilyMember.fromDTO(x, this.mainFamilyMember));
        });
        this.GetActionPlan();

      } else {

        this.familyService.getFamily(id).subscribe({
          next: response => {
            this.mainFamilyMemberId = id;
            this.family = response;
            this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
            this.family.dependentMembers.forEach(x => {
              this.dependentMembers.push(DependentFamilyMember.fromDTO(x, this.mainFamilyMember));
            });
            this.GetActionPlan();
          }
        });

      }

    });
  }

  public GetActionPlan(): void {
    this.actionPlanService.LoadActionPlan(this.mainFamilyMemberId).subscribe({
      next: (data) => {
        this.actionPlanTaskList = data.actionList;
      }
    });
  }

  public getConcludedTasksCount(): number {
    return this.actionPlanTaskList.filter(x => x.done.toString() === 'Yes').length;
  }

}

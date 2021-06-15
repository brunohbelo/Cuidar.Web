import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { FamilyDTO } from 'src/app/models/dtos/FamilyDTO';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { DataShareService } from 'src/app/services/DataShare.service';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-family-action-plan',
  templateUrl: './family-action-plan.component.html',
  styleUrls: ['./family-action-plan.component.scss']
})
export class FamilyActionPlanComponent implements OnInit {

  private mainFamilyMemberId!: string;
  public mainFamilyMember!: MainFamilyMember;
  public family!: FamilyDTO;

  constructor(private route: ActivatedRoute, private familyService: FamilyService, private dataShare: DataShareService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id => {
      if (this.dataShare.family) {

        this.mainFamilyMemberId = id;
        this.family = this.dataShare.family;
        this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);

      } else {

        this.familyService.getFamily(id).subscribe({
          next: response => {
            this.mainFamilyMemberId = id;
            this.family = response;
            this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
          }
        });

      }

    });
  }

}

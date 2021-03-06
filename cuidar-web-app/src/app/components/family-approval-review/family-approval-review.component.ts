import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { DependentFamilyMemberDTO } from 'src/app/models/dtos/DepententFamilyMemberDTO';
import { FamilyDTO } from 'src/app/models/dtos/FamilyDTO';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { DataShareService } from 'src/app/services/DataShare.service';
import { FamilyService } from 'src/app/services/Family.service';
import { FamilySyndicanceService } from 'src/app/services/Syndicance.service';


@Component({
  selector: 'app-family-approval-review',
  templateUrl: './family-approval-review.component.html',
  styleUrls: ['./family-approval-review.component.scss']
})
export class FamilyApprovalReviewComponent implements OnInit {

  familyStatusHelper = FamilyStatusHelper;
  public family!: FamilyDTO;
  public syndicationNotes: string;
  private mainFamilyMemberId!: string;

  constructor(private route: ActivatedRoute, private familyService: FamilyService, private familySyndicanceService: FamilySyndicanceService,
              private snackBar: MatSnackBar, private router: Router, private dataShare: DataShareService) {
    this.syndicationNotes = '';
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id => {
      this.familyService.getFamily(id).subscribe({
        next: response => {
          this.mainFamilyMemberId = id;
          this.family = response;
        }
      });
    });
  }

  getMainFamilyMember(): MainFamilyMember {
    return MainFamilyMember.fromDTO(this.family.mainFamilyMember);
  }

  getDependentMember(dto: DependentFamilyMemberDTO): DependentFamilyMember {
    return DependentFamilyMember.fromDTO(dto, this.getMainFamilyMember());
  }

  approveSindicance(): void {
    this.familySyndicanceService.approveFamilySindicance(this.mainFamilyMemberId, this.syndicationNotes).subscribe({
      next: () => {
        this.dataShare.family = this.family;
        this.snackBar.open('Fam??lia aprovada!', '', { duration: 5000 });
        this.router.navigate(['/family-action-plan', {id: this.mainFamilyMemberId}]);
      }
    });
  }

  reproveSindicance(): void {
    this.familySyndicanceService.reproveFamilySindicance(this.mainFamilyMemberId, this.syndicationNotes).subscribe({
      next: () => {
        this.snackBar.open('Fam??lia reprovada', '', { duration: 5000 });
        this.router.navigate(['/family-search']);
      }
    });
  }

  showSindicanceButtons(): boolean {
    if (this.familyStatusHelper.getFamilyStatus(this.family.mainFamilyMember.generalStatus) === FamilyStatus.PendingApproval) {
      return true;
    } else {
      return false;
    }
  }

}

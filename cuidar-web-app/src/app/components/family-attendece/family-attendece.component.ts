import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { AttendanceDTO, AttendanceLinkedActionDTO, AttendanceLinkedFamilyMemberDTO } from 'src/app/models/dtos/AttendenceDTO';
import { FamilyActionPlanItemDTO } from 'src/app/models/dtos/FamilyActionPlanItemDTO';
import { FamilyDTO } from 'src/app/models/dtos/FamilyDTO';
import { FamilyMemberNoYesFlag } from 'src/app/models/enums/FamilyMemberNoYesFlag';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { ActionPlanService } from 'src/app/services/ActionPlan.service';
import { AttendenceService as AttendanceService } from 'src/app/services/Attendence.service';
import { DataShareService } from 'src/app/services/DataShare.service';
import { FamilyService } from 'src/app/services/Family.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';

export interface FamilyMemberAttendence {
  id: string;
  fullName: string;
  description: string;
  linked: boolean;
}

@Component({
  selector: 'app-family-attendece',
  templateUrl: './family-attendece.component.html',
  styleUrls: ['./family-attendece.component.scss']
})
export class FamilyAttendeceComponent implements OnInit {

  @ViewChild(NgForm) form!: NgForm;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private familyService: FamilyService, private dataShare: DataShareService, private actionPlanService: ActionPlanService, private attendanceService: AttendanceService, private snackBar: MatSnackBar) {
  }

  public familyStatusHelper = FamilyStatusHelper;
  public mainFamilyMemberId!: string;
  public mainFamilyMember!: MainFamilyMember;
  public actionPlanTaskList!: Array<FamilyActionPlanItemDTO>;
  public familyMembers = new Array<FamilyMemberAttendence>();
  public family!: FamilyDTO;
  public attendenceDate = new Date();
  public attendenceNotes = '';


  FormValid(): boolean {
    return this.form?.valid ?? false;
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id => {
      if (this.dataShare.family) {

        this.mainFamilyMemberId = id;
        this.family = this.dataShare.family;
        this.fillFamilyMemberList(this.family);
        this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
        this.GetActionPlan();

      } else {

        this.familyService.getFamily(id).subscribe({
          next: response => {
            this.mainFamilyMemberId = id;
            this.family = response;
            this.fillFamilyMemberList(this.family);
            this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
            this.GetActionPlan();
          }
        });

      }

    });
  }

  public toogleItemFlag(item: FamilyActionPlanItemDTO, checked: boolean): void {
    item.done = checked ? FamilyMemberNoYesFlag.Yes : FamilyMemberNoYesFlag.No;
  }

  public toogleMemberFlag(member: FamilyMemberAttendence, checked: boolean): void {
    member.linked = checked;
  }


  public fillFamilyMemberList(family: FamilyDTO): void {
    this.familyMembers.push({
      id: family.mainFamilyMember.id, description: 'Membro Principal', fullName: family.mainFamilyMember.fullName, linked: false
    });

    family.dependentMembers.forEach(x => {
      this.familyMembers.push({
        id: x.id, description: x.linkTypeToMainMember, fullName: x.fullName, linked: false
      });
    });
  }

  public GetActionPlan(): void {
    this.actionPlanService.LoadActionPlan(this.mainFamilyMemberId).subscribe({
      next: (data) => {
        this.actionPlanTaskList = data.actionList.filter(x => x.done.toString() === 'No');
      }
    });
  }

  public Registrar_Click(): void {
    this.OpenDialog();
  }

  private OpenDialog(): void {

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        title: 'Deseja mesmo confirmar a operação?',
        subtitle: 'A operção não poderá ser revertida',
        description: '',
        response: 'nao'
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === 'nao') {
        return;
      }

      this.RegisterAttendence();
    });
  }

  RegisterAttendence(): void {
    const attendanceDTO = new AttendanceDTO();
    attendanceDTO.attendanceDateTime = new Date();
    attendanceDTO.linkedActionPlanItems = this.actionPlanTaskList.filter(x => x.done === FamilyMemberNoYesFlag.Yes)
      .map(item => new AttendanceLinkedActionDTO(item.id, item.description));
    attendanceDTO.linkedFamilyMembers = this.familyMembers.filter(x => x.linked === true)
      .map(y => new AttendanceLinkedFamilyMemberDTO(y.id, y.fullName));
    attendanceDTO.notes = this.attendenceNotes;

    this.attendanceService.registerAttendance(this.mainFamilyMemberId, attendanceDTO).subscribe({
      next: () => {
        this.alertSuccessAndReturn('Atendimento registrado');
      }
    });
  }

  private alertSuccessAndReturn(mensagem: string): void {
    this.snackBar.open(mensagem, '', { duration: 5000 });
    this.router.navigate(['/family-menu', this.mainFamilyMemberId]);
  }

}

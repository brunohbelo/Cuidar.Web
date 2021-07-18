import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { FamilyActionPlanItemCreationDTO } from 'src/app/models/dtos/FamilyActionPlanItemCreationDTO';
import { FamilyActionPlanItemDTO } from 'src/app/models/dtos/FamilyActionPlanItemDTO';
import { FamilyDTO } from 'src/app/models/dtos/FamilyDTO';
import { FamilyMemberNoYesFlag } from 'src/app/models/enums/FamilyMemberNoYesFlag';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { ActionPlanService } from 'src/app/services/ActionPlan.service';
import { DataShareService } from 'src/app/services/DataShare.service';
import { FamilyService } from 'src/app/services/Family.service';
import { ActionPlanItemDialog, FamilyActionPlanItemComponent } from './family-action-plan-item/family-action-plan-item.component';

@Component({
  selector: 'app-family-action-plan',
  templateUrl: './family-action-plan.component.html',
  styleUrls: ['./family-action-plan.component.scss']
})
export class FamilyActionPlanComponent implements OnInit {

  private familyMemberNoYesFlag = FamilyMemberNoYesFlag;
  private mainFamilyMemberId!: string;
  public familyStatusHelper = FamilyStatusHelper;
  public mainFamilyMember!: MainFamilyMember;
  public family!: FamilyDTO;

  public taskAssistidoDescription = '';
  public taskAssistenteDescription = '';

  public actionPlanTaskList = new Array<FamilyActionPlanItemDTO>();
  public actionPlanCreationTaskList = new Array<FamilyActionPlanItemCreationDTO>();
  public get ActionPlanTaskAssistente(): Array<FamilyActionPlanItemDTO> {
    return this.actionPlanTaskList.filter(x => x.isAssistentTask.toString() === 'Yes');
  }
  public get ActionPlanTaskAssistido(): Array<FamilyActionPlanItemDTO> {
    return this.actionPlanTaskList.filter(x => x.isAssistentTask.toString() === 'No');
  }

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private familyService: FamilyService
    // tslint:disable-next-line:align
    , private dataShare: DataShareService, private actionPlanService: ActionPlanService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id => {
      if (this.dataShare.family) {

        this.mainFamilyMemberId = id;
        this.family = this.dataShare.family;
        this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
        this.GetActionPlan();

      } else {

        this.familyService.getFamily(id).subscribe({
          next: response => {
            this.mainFamilyMemberId = id;
            this.family = response;
            this.mainFamilyMember = MainFamilyMember.fromDTO(this.family.mainFamilyMember);
            this.GetActionPlan();
          }
        });

      }

    });
  }

  openDialog(assistentItem: boolean): void {

    const faMembers = new Array<FamilyMember>();
    faMembers.push(this.mainFamilyMember);
    this.family.dependentMembers.forEach(x => {
      faMembers.push(DependentFamilyMember.fromDTO(x, this.mainFamilyMember));
    });

    const dialogRef = this.dialog.open(FamilyActionPlanItemComponent, {
      width: '400px',
      data: {
        description: !assistentItem ? this.taskAssistidoDescription : this.taskAssistenteDescription,
        isAssistentItem: assistentItem,
        familyMembers: faMembers,
        dueDate: undefined,
        assistenceDueDate: this.mainFamilyMember.assistenceDueDate
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.InserirActionPlanTaskSubscriber(data);
    });
  }

  public InserirActionPlanTaskSubscriber(data: ActionPlanItemDialog): void {
    if (!data) {
      return;
    }

    const item = new FamilyActionPlanItemCreationDTO();
    item.description = data.description;
    item.isAssistentTask = data.isAssistentItem ? FamilyMemberNoYesFlag.Yes : FamilyMemberNoYesFlag.No;
    item.dueDate = data.dueDate ?? null;
    item.referencedFamilyMemberId = data.referencedFamilyMemberId;
    this.actionPlanCreationTaskList.push(item);

    const task = new FamilyActionPlanItemDTO();
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.done = 'No' as FamilyMemberNoYesFlag;
    task.isAssistentTask = data.isAssistentItem
      ? getEnumKeyByEnumValue(FamilyMemberNoYesFlag, this.familyMemberNoYesFlag.Yes) as FamilyMemberNoYesFlag
      : getEnumKeyByEnumValue(FamilyMemberNoYesFlag, this.familyMemberNoYesFlag.No) as FamilyMemberNoYesFlag;
    task.referencedFamilyMember_Id = data.referencedFamilyMemberId;
    task.referencedFamilyMember_Name = data.familyMembers.length > 0 ? data.familyMembers[0].fullName : '';
    this.actionPlanTaskList.push(task);

    if (data.isAssistentItem) {
      this.taskAssistenteDescription = '';
    } else {
      this.taskAssistidoDescription = '';
    }

  }

  public GetActionPlan(): void {
    this.actionPlanService.LoadActionPlan(this.mainFamilyMemberId).subscribe({
      next: (data) => {
        this.actionPlanTaskList = data.actionList;
      }
    });
  }

  public SaveActionPlan(): void {

    for (let index = 0; index < this.actionPlanCreationTaskList.length; index++) {
      const task = this.actionPlanCreationTaskList[index];

      this.actionPlanService.InsertActionPlanTask(this.mainFamilyMemberId, task).subscribe({
        next: () => {
          if (index === this.actionPlanCreationTaskList.length - 1) {
            this.snackBar.open('Plano de ação criado com sucesso!', '', { duration: 2000 });
          }

          this.GetActionPlan();
        }, error: () => {
          this.snackBar.open('', 'Houve um erro ao inserir uma tarefa, tente novamente mais tarde', { duration: 2000, panelClass: 'panel-snackbar' });
        }
      });
    }

  }

}

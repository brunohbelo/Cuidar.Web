import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
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
  public mainFamilyMember!: MainFamilyMember;
  public family!: FamilyDTO;

  public taskAssistidoDescription = '';
  public taskAssistenteDescription = '';

  public actionPlanTaskList = new Array<FamilyActionPlanItemDTO>();
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

    this.actionPlanService.InsertActionPlanTask(this.mainFamilyMemberId, item).subscribe({
      next: () => {
        this.snackBar.open('Tarefa de plano de ação criada com sucesso', '', { duration: 2000 });
        if (data.isAssistentItem) {
          this.taskAssistenteDescription = '';
        } else {
          this.taskAssistidoDescription = '';
        }

        this.GetActionPlan();
      }, error: () => {
        this.snackBar.open('', 'Houve um erro ao inserir a tarefa, tente novamente mais tarde', { duration: 2000, panelClass: 'panel-snackbar' });
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

}

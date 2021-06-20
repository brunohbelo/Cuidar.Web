import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FamilyActionPlanItemDTO } from 'src/app/models/dtos/FamilyActionPlanItemDTO';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamilyMember } from 'src/app/models/FamilyMember';

export interface ActionPlanItemDialog {
  description: string;
  isAssistentItem: boolean;
  dueDate: Date | undefined;
  assistenceDueDate: Date;
  referencedFamilyMemberId: string;
  familyMembers: FamilyMember[];

}

@Component({
  selector: 'app-family-action-plan-item',
  templateUrl: './family-action-plan-item.component.html',
  styleUrls: ['./family-action-plan-item.component.scss']
})
export class FamilyActionPlanItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FamilyActionPlanItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ActionPlanItemDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public SaveItem_Click(): void {
    if (this.data.dueDate && this.data.dueDate < new Date()) {
      this.snackBar.open('', 'Data de término inválida', { duration: 2000 });
      return;
    }
    if (this.data.dueDate && this.data.dueDate > this.data.assistenceDueDate) {
      this.snackBar.open('', 'Data de término inválida', { duration: 2000, panelClass: 'panel-snackbar' });
      return;
    }

    this.dialogRef.close(this.data);

  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ConfirmationDialog {
  title: string;
  subtitle: string;
  description: string;
  response: 'sim' | 'nao';
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public Option_Click(option: string): void{
    this.dialogRef.close(option);
  }

}

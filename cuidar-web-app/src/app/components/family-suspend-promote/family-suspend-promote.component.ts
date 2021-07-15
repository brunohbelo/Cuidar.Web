import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { FamilySyndicanceService } from 'src/app/services/Syndicance.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';

@Component({
  selector: 'app-family-suspend-promote',
  templateUrl: './family-suspend-promote.component.html',
  styleUrls: ['./family-suspend-promote.component.scss']
})
export class FamilySuspendPromoteComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private syndicanceService: FamilySyndicanceService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  public operationType!: 'suspend' | 'promote';
  public syndicationNotes = '';
  public mainMemberId = '';

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).toPromise().then(id => {
      this.mainMemberId = id;
    });
  }

  Atualizar_Click(): void{
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

      this.UpdateSyndicanceStatus();
    });
  }

  private UpdateSyndicanceStatus(): void {
    if (this.operationType === 'promote') {
      this.syndicanceService.promoteFamilySindicance(this.mainMemberId, this.syndicationNotes).subscribe({
        next: () => {
          this.alertSuccessAndReturn('Família promovida');
        }
      });
    } else {
      this.syndicanceService.suspendFamilySindicance(this.mainMemberId, this.syndicationNotes).subscribe({
        next: () => {
          this.alertSuccessAndReturn('Família suspensa');
        }
      });
    }
  }

  private alertSuccessAndReturn(mensagem: string): void{
    this.snackBar.open(mensagem, '', { duration: 5000 });
    this.router.navigate(['family-search']);
  }

}

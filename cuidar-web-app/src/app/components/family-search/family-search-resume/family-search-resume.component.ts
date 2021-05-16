import { Component, Input, OnInit } from '@angular/core';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';

@Component({
  selector: 'app-family-search-resume',
  templateUrl: './family-search-resume.component.html',
  styleUrls: ['./family-search-resume.component.scss']
})
export class FamilySearchResumeComponent implements OnInit {

  @Input()
  fullName!: string;
  @Input()
  documentId!: string;
  @Input()
  status!: FamilyStatus;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusCollor(status: FamilyStatus): any {
    const color = { 'background-color': '' };
    switch (status) {
      case FamilyStatus.Active:
        color['background-color'] = 'rgba(98,217,79,0.5)';
        break;
      case FamilyStatus.PendingApproval:
        color['background-color'] = 'rgba(237,167,103,0.5)';
        break;
      case FamilyStatus.Promoted:
        color['background-color'] = 'rgba(147,120,255,0.5)';
        break;
      case FamilyStatus.Suspended:
        color['background-color'] = 'rgba(228,96,96,0.5)';
        break;
    }

    return color;
  }

}

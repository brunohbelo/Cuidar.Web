import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { FamilyAttendanceResponse } from 'src/app/models/dtos/FamilyAtendanceDTO';
import { AttendenceService as AttendanceService } from 'src/app/services/Attendance.service';

@Component({
  selector: 'app-family-attendance-history',
  templateUrl: './family-attendance-history.component.html',
  styleUrls: ['./family-attendance-history.component.scss']
})
export class FamilyAttendanceHistoryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private attendanceService: AttendanceService) { }

  @ViewChild('viewPort')
  virtualScroll!: CdkVirtualScrollViewport;

  public familyStatusHelper = FamilyStatusHelper;
  public dataSource: AttendanceDataSource | undefined;
  public mainFamilyMemberId!: string;

  ngOnInit(): void {
    this.activatedRoute.params.pipe(pluck('id')).subscribe(id => {
      this.mainFamilyMemberId = id;
      this.dataSource = new AttendanceDataSource(this.mainFamilyMemberId, this.attendanceService);
    });
  }

  getViewReportHeight(): string {
    let height = '';
    if (!this.virtualScroll) {
      height = window.innerHeight.toString();
    } else {
      height = (window.innerHeight - (this.virtualScroll.elementRef.nativeElement.offsetTop ?? 0) - 15).toString();
    }

    return height + 'px';
  }

}


class AttendanceDataSource extends DataSource<FamilyAttendanceResponse | undefined> {
  private length = 1;
  private pageSize = 10;
  private cachedData = Array.from<FamilyAttendanceResponse>({ length: this.length });
  private fetchedPages = new Set<number>();
  private mainFamilyMemberId: string;
  private readonly dataStream = new BehaviorSubject<(FamilyAttendanceResponse | undefined)[]>(this.cachedData);
  private readonly subscription = new Subscription();

  constructor(mainFamilyMemberId: string, private attendanceService: AttendanceService) {
    super();
    this.mainFamilyMemberId = mainFamilyMemberId;
  }

  connect(collectionViewer: CollectionViewer): Observable<(FamilyAttendanceResponse | undefined)[]> {

    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));

    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private _fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.attendanceService.getAttendanceHistory(this.mainFamilyMemberId, page).subscribe({
      next: response => {
        this.length = response.totalItems;
        this.cachedData.push(...response.attendances);
        this.cachedData.sort(this.sortFamilyAttendance);
        this.dataStream.next(this.cachedData);
      }
    });

  }
  private sortFamilyAttendance(attendance1: FamilyAttendanceResponse, attendance2: FamilyAttendanceResponse): number {
    if (attendance1.attendanceDateTime > attendance2.attendanceDateTime) {
      return 1;
    } else if (attendance1.attendanceDateTime < attendance2.attendanceDateTime) {
      return -1;
    } else {
      return 0;
    }

  }


}

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators';
import { getEnumKeyByEnumValue } from 'src/app/helpers/enumHelper';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { FamilyMemberFamilySearchResponse, FamilySearchDTO } from 'src/app/models/dtos/FamilySearchDTO';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';
import { ActionPlanService } from 'src/app/services/ActionPlan.service';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilySearchComponent implements OnInit, OnDestroy {

  public dataSource = new FamilyDataSource(this.familyService);
  public searchingName!: string;
  public innerWidth!: number;
  public nameSearchChanged: Subject<string> = new Subject<string>();
  private nameSearchChangeSubscription!: Subscription;

  familyStatusHelper = FamilyStatusHelper;

  @ViewChild('viewPort')
  virtualScroll!: CdkVirtualScrollViewport;

  // tslint:disable-next-line:max-line-length
  constructor(private familyService: FamilyService, private changeDetectorRefs: ChangeDetectorRef, private router: Router, private actionPlanService: ActionPlanService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.nameSearchChangeSubscription = this.nameSearchChanged.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(newName => {
        if (newName.length < 3) {
          return;
        }
        this.searchingName = newName;
        this.dataSource.searchByName(this.searchingName);
      });
  }

  ngOnDestroy(): void {
    this.nameSearchChangeSubscription.unsubscribe();
  }

  detailsClick(familyStatus: FamilyStatus, familyId: string): void {
    if (familyStatus !== getEnumKeyByEnumValue(FamilyStatus, FamilyStatus.PendingApproval)) {
      this.actionPlanService.LoadActionPlan(familyId).subscribe({
        next: (data) => {
          if (familyStatus === getEnumKeyByEnumValue(FamilyStatus, FamilyStatus.Active) && data.actionList.length === 0) {
            this.router.navigate(['/family-action-plan', familyId]);
          } else {
            this.router.navigate(['/family-menu', familyId]);
          }
        }
      });
    } else {
      this.router.navigate(['/family-sindicance', familyId]);
    }
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

class FamilyDataSource extends DataSource<FamilyMemberFamilySearchResponse | undefined> {
  private length = 1;
  private pageSize = 2;
  private cachedData = Array.from<FamilyMemberFamilySearchResponse>({ length: this.length });
  private fetchedPages = new Set<number>();
  private searchingName = '';
  private readonly dataStream = new BehaviorSubject<(FamilyMemberFamilySearchResponse | undefined)[]>(this.cachedData);
  private readonly subscription = new Subscription();

  constructor(private familyService: FamilyService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(FamilyMemberFamilySearchResponse | undefined)[]> {

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

  searchByName(name: string): void {
    this.length = 1;
    this.fetchedPages = new Set<number>();
    this.searchingName = name;
    this.cachedData.splice(0);
    this._fetchPage(0);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private _fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    if (this.searchingName.length <= 1) {
      this.familyService.getAllFamilies(page).subscribe({
        next: response => {
          this.length = response.totalItems;
          this.cachedData.push(...response.families);
          this.cachedData.sort(this.sortFamilyMemberByname);
          this.dataStream.next(this.cachedData);
        }
      });
    } else {
      this.familyService.getFamilyByName(this.searchingName, page).subscribe({
        next: response => {
          this.length = response.totalItems;
          this.cachedData.push(...response.families);
          this.cachedData.sort(this.sortFamilyMemberByname);
          this.dataStream.next(this.cachedData);
        }
      });
    }

  }

  private sortFamilyMemberByname(member1: FamilyMemberFamilySearchResponse, member2: FamilyMemberFamilySearchResponse): number {
    if (member1.fullName > member2.fullName) {
      return 1;
    } else if (member1.fullName < member2.fullName) {
      return -1;
    } else {
      return 0;
    }

  }

}

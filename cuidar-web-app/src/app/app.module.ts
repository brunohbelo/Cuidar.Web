import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MembroFamiliaComponent } from './components/cadastro-familia/membro-familia/membro-familia.component';
import { CadastroFamiliaComponent } from './components/cadastro-familia/cadastro-familia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FamilyMemberResumeComponent } from './components/family-member-resume/family-member-resume.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';
import { FamilySearchComponent } from './components/family-search/family-search.component';
import { WebApiInterceptor } from './interceptors/webApiInterceptor';
import { FamilySearchResumeComponent } from './components/family-search/family-search-resume/family-search-resume.component';
import { FamilyApprovalReviewComponent } from './components/family-approval-review/family-approval-review.component';
import { FamilyActionPlanComponent } from './components/family-action-plan/family-action-plan.component';
import { FamilyActionPlanItemComponent } from './components/family-action-plan/family-action-plan-item/family-action-plan-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FamilyMenuComponent } from './components/family-menu/family-menu.component';
import { FamilySuspendPromoteComponent } from './components/family-suspend-promote/family-suspend-promote.component';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmationComponent } from './components/modals/confirmation/confirmation.component';
import { MatCardModule } from '@angular/material/card';
import { PlatformStatsComponent } from './components/platform-stats/platform-stats.component';
import { PlatformStatsFamiliesComponent } from './components/platform-stats-families/platform-stats-families.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CadastroFamiliaComponent,
    MembroFamiliaComponent,
    FamilyMemberResumeComponent,
    FamilySearchComponent,
    FamilySearchResumeComponent,
    FamilyApprovalReviewComponent,
    FamilyActionPlanComponent,
    FamilyActionPlanItemComponent,
    FamilyMenuComponent,
    FamilySuspendPromoteComponent,
    ConfirmationComponent,
    PlatformStatsComponent,
    PlatformStatsFamiliesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    RxReactiveFormsModule,
    ScrollingModule,
    NgxChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    WebApiInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

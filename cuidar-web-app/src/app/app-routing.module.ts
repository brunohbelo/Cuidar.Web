import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroFamiliaComponent } from './components/cadastro-familia/cadastro-familia.component';
import { FamilyActionPlanComponent } from './components/family-action-plan/family-action-plan.component';
import { FamilyApprovalReviewComponent } from './components/family-approval-review/family-approval-review.component';
import { FamilyAttendanceHistoryComponent } from './components/family-attendance-history/family-attendance-history.component';
import { FamilyAttendeceComponent } from './components/family-attendece/family-attendece.component';
import { FamilyMenuComponent } from './components/family-menu/family-menu.component';
import { FamilySearchComponent } from './components/family-search/family-search.component';
import { FamilySuspendPromoteComponent } from './components/family-suspend-promote/family-suspend-promote.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlatformStatsComponent } from './components/platform-stats/platform-stats.component';
import { AuthGuardService } from './services/AuthGuard.service';

// Rotas novas devem ser adicionadas aqui
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro-familia', component: CadastroFamiliaComponent, canActivate: [AuthGuardService] },
  { path: 'family-search', component: FamilySearchComponent, canActivate: [AuthGuardService] },
  { path: 'family-sindicance/:id', component: FamilyApprovalReviewComponent, canActivate: [AuthGuardService] },
  { path: 'family-action-plan/:id', component: FamilyActionPlanComponent, canActivate: [AuthGuardService] },
  { path: 'family-menu/:id', component: FamilyMenuComponent, canActivate: [AuthGuardService] },
  { path: 'family-suspend-promote/:id', component: FamilySuspendPromoteComponent, canActivate: [AuthGuardService] },
  { path: 'platform-stats', component: PlatformStatsComponent, canActivate: [AuthGuardService] },
  { path: 'family-attendance/:id', component: FamilyAttendeceComponent, canActivate: [AuthGuardService] },
  { path: 'family-attendance-history/:id', component: FamilyAttendanceHistoryComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { PlatformStatsComponent } from './components/platform-stats/platform-stats.component';

// Rotas novas devem ser adicionadas aqui
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro-familia', component: CadastroFamiliaComponent },
  { path: 'family-search', component: FamilySearchComponent },
  { path: 'family-sindicance/:id', component: FamilyApprovalReviewComponent },
  { path: 'family-action-plan/:id', component: FamilyActionPlanComponent },
  { path: 'family-menu/:id', component: FamilyMenuComponent },
  { path: 'family-suspend-promote/:id', component: FamilySuspendPromoteComponent },
  { path: 'platform-stats', component: PlatformStatsComponent },
  { path: 'family-attendance/:id', component: FamilyAttendeceComponent },
  { path: 'family-attendance-history/:id', component: FamilyAttendanceHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

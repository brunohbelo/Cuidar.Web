import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroFamiliaComponent } from './components/cadastro-familia/cadastro-familia.component';
import { HomeComponent } from './components/home/home.component';

// Rotas novas devem ser adicionadas aqui
const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'cadastro-familia', component: CadastroFamiliaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

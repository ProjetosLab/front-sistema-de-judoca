import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent },
  {path: 'search/:nome', component: SearchComponent },
  {path: 'update/1/:cpf', component: RegisterComponent },
  {path: 'update/2/:cnpj', component: RegisterComponent },
  {path: 'update/enroll/:idEnroll/:idCliente', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResultComponent } from './form-result/form-result.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/user-form', pathMatch: 'full'},
  {path: 'user-form', component: HomeComponent},
  {path: 'view-data', component: FormResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

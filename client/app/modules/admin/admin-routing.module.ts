import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { InputComponent } from './pages/input/input.component';


const routes: Routes = [
  {
  path: 'admin',
  component: AdminComponent
  },
  {
  path: 'input',
  component: InputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

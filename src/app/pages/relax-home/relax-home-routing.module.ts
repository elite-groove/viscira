import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelaxHomePage } from './relax-home.page';

const routes: Routes = [
  {
    path: '',
    component: RelaxHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelaxHomePageRoutingModule {}

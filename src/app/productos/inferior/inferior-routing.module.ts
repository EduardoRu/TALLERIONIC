import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InferiorPage } from './inferior.page';

const routes: Routes = [
  {
    path: '',
    component: InferiorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InferiorPageRoutingModule {}

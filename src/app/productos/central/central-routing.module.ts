import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentralPage } from './central.page';
import { TabsPage } from 'src/app/tabs/tabs.page';

const routes: Routes = [
  {
    path:'tabs',
    component:TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('src/app/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('src/app/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('src/app/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: CentralPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentralPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentralPageRoutingModule } from './central-routing.module';

import { CentralPage } from './central.page';
import { ComponentesModule } from 'src/app/componentes/componentes/componentes.module';

import { TabsPageRoutingModule } from 'src/app/tabs/tabs-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentralPageRoutingModule,
    ComponentesModule,
    TabsPageRoutingModule
  ],
  declarations: [CentralPage]
})
export class CentralPageModule {}

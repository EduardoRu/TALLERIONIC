import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { CitaPage } from '../cita/cita.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cont:number;
  constructor(
    private menuCTRL:MenuController,
    private modalCTRL: ModalController,
    private route: Router
  ) {
  }

  async citas(){
    this.route.navigateByUrl('ser/cita')
  }
}

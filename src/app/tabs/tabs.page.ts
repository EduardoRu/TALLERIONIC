import { Component } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private toast:ToastController
  ) {
  }
  /*
  async message(){
    const toast = await this.toast.create({
      message: "Desliza a la derecha para abrir el menú",
      color: "tertiary",
      duration: 1000
    });
    await toast.present();
  }
  */
}

import { Component } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { FirebaseService } from '../service/firebase.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private toast:ToastController,
    private dataService: FirebaseService,
    private auth: Auth
  ) {
    this.auth.onAuthStateChanged(function (user) {
      if(!user){
        
      }else{  
        
      }
    })
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

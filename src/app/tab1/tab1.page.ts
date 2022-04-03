import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { FirebaseService, producto } from 'src/app/service/firebase.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  contSec:number;
  articulos:producto[];

  constructor(
    private menu:MenuController,
    private route: Router,
    private dataService: FirebaseService,
    private cd: ChangeDetectorRef,
    private alertCTRL: AlertController
  ) {
    this.menu.close();
    this.dataService.getProductoFrontal().subscribe(res=>{
      this.articulos = res;
      this.cd.detectChanges;
    })
  }
  async info(prod:producto){
    const alert = await this.alertCTRL.create({
      header: prod.nombre,
      subHeader: "Precio: $" + prod.precio,
      message: prod.desc,
      buttons:['OK']
    });
    await alert.present();
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { FirebaseService, producto } from 'src/app/service/firebase.service';


@Component({
  selector: 'app-central',
  templateUrl: './central.page.html',
  styleUrls: ['./central.page.scss'],
})
export class CentralPage implements OnInit {
  articulos:producto[];

  constructor(
    private route:Router,
    private menu:MenuController,
    private alertCTRL: AlertController,
    private dataService: FirebaseService,
    private cd: ChangeDetectorRef 
  ) { }

  ngOnInit(
  ) {
    this.menu.close();
    this.dataService.getProductoCentral().subscribe(res=>{
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

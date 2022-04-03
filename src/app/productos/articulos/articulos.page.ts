import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { FirebaseService, producto } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  articulos:producto[];

  constructor(
    private dataService:FirebaseService,
    private cd: ChangeDetectorRef,
    private menu:MenuController,
    private route:Router,
    private alertCTRL:AlertController
  ) { }

  ngOnInit() {
    this.menu.close();
    this.dataService.getProductoArticulo().subscribe(res=>{
      this.articulos = res;
      this.cd.detectChanges;
    });
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

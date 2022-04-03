import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { FirebaseService, producto } from 'src/app/service/firebase.service';


@Component({
  selector: 'app-inferior',
  templateUrl: './inferior.page.html',
  styleUrls: ['./inferior.page.scss'],
})
export class InferiorPage implements OnInit {

  articulos:producto[];
  
  constructor(
    private alertCTRL: AlertController,
    private menu: MenuController,
    private dataService: FirebaseService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.menu.close();
    this.dataService.getProductoInferior().subscribe(res=>{
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

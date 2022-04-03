import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, MenuController, ModalController } from '@ionic/angular';
import { CitaPage } from '../cita/cita.page';
import { FirebaseService, Servicio } from '../service/firebase.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cont:number;
  servicios:Servicio[]
  list:Servicio[]

  @ViewChild('search', {static: false}) search: IonSearchbar;

  constructor(
    private menuCTRL:MenuController,
    private modalCTRL: ModalController,
    private route: Router,
    private dataService: FirebaseService
  ) {
    this.dataService.getServicios().subscribe(res=>{
      this.servicios = res;
      this.list = res;
    });
  }

  async citas(){
    this.route.navigateByUrl('ser/cita')
  }

  _ionChange(event){
    const val = event.target.value;
    this.servicios = this.list;
    if (val && val.trim() != '') {
      this.servicios = this.servicios.filter((item:any)=>{
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > - 1);
      })
    }
  }
}

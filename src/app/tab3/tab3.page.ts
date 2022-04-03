import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map: Leaflet.Map;
  constructor(
    private modalCTRL:ModalController,
    private route: Router,
    private auth: Auth
  ) {
    this.auth.onAuthStateChanged(function (estado) {
      if(!estado){
       document.getElementById('txtAuth').innerHTML="Ingresar"
       document.getElementById('btnRegister').setAttribute('disabled', 'false') 
      }else{
        document.getElementById('txtAuth').innerHTML="Perfil"
        document.getElementById('btnRegister').setAttribute('disabled', 'true')
      }
    })
  }

  ionViewDidEnter() { 
    this.leafletMap(); 
  }
  leafletMap() {
    this.map = new Leaflet.Map('mapId').setView([22.7641114, -102.4966424], 19);
    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
    
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  async singin(){
    await this.route.navigateByUrl('singin');
  }

  async singup(){
   await this.route.navigateByUrl('singup');
  }

  async soporte(){
    await this.route.navigateByUrl('soporte');
  }
}

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';
import { Auth, isSignInWithEmailLink } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map: Leaflet.Map;
  constructor(
    private modalCTRL:ModalController,
    private route: Router
  ) {}

  ionViewDidEnter() { 
    this.leafletMap(); 
  }
  leafletMap() {
    this.map = new Leaflet.Map('mapId').setView([22.7641114, -102.4966424], 19);
    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);
    
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  very(){
    if(isSignInWithEmailLink){
      console.log(false)
    }else{
      console.log(true)
    }
  }

  async singin(){
    await this.route.navigateByUrl('singin');
  }

  async singup(){
   await this.route.navigateByUrl('singup');
  }
}

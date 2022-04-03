import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, Cita } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.page.html',
  styleUrls: ['./cita.page.scss'],
})
export class CitaPage implements OnInit {
  cita:Cita[]=[];
  datosCita:FormGroup;
  myNumeroAleatorio:any;
  constructor(
    private dataService: FirebaseService,
    private alertCTRL: AlertController,
    private loadCTRL: LoadingController,
    private toastCTRL: ToastController,
    private fb: FormBuilder,
    private route: Router,
    private modalctrl: ModalController
  ) { }

  ngOnInit() {
    this.myNumeroAleatorio = Math.floor(Math.random()*394)+79
    this.datosCita = this.fb.group({
      nombre:['', [Validators.required]],
      problema:['', [Validators.required]],
      fechaRecibo:['', [Validators.required]],
      nota:[''],
      folio:[this.myNumeroAleatorio]
    })
  }

  async agregaCita(){
    const loadgin = await this.loadCTRL.create();
    await loadgin.present();
    if (
    !this.datosCita.value['nombre'] || 
    !this.datosCita.value['problema'] || 
    !this.datosCita.value['fechaRecibo']
    ) {
      this.alerta('Registro fallido', 'Favor de completar los datos')
      loadgin.dismiss();
    }else{
      const cita = await this.dataService.addcita(this.datosCita.value);
      if(cita){
        loadgin.dismiss();
        this.route.navigateByUrl('tabs/tab2', {replaceUrl:true})
        this.alerta('Cita agregada con exito', 'Favor de tomar captura a su folio: ' + this.myNumeroAleatorio)
      }else{
        this.alerta('Registro fallido', 'Favor de volverlo a intentar')
        loadgin.dismiss();
      }
    }
  }

  async alerta(header, message){
    const alert = await this.alertCTRL.create({
      header,
      message,
      buttons:['OK']
    });
    await alert.present();
  }

}

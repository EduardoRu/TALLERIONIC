import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthserviceService } from '../service/authservice.service';
import { Auth } from '@angular/fire/auth';
import { FirebaseService, Users } from '../service/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {
  soporte: FormGroup;
  nombre: string;

  constructor(
    private auth: AuthserviceService,
    private router: Router,
    private alertCTRL: AlertController,
    private loadingCTRL: LoadingController,
    private atuhUser: Auth,
    private dataService: FirebaseService,
    private tastCTRL: ToastController,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit() {

    var email;
    var nombre;

    this.atuhUser.onAuthStateChanged(function (user) {
      email = user.email;
    });

    this.dataService.getUsuarios().subscribe(res=>{
      res.forEach(element => {
        if(String(element.email) == String(email)){
          this.nombre = element.nombre;
          nombre = element.nombre;
        }
      });
    });
    this.nombre = nombre

    this.soporte = this.fb.group({
      nombre:['', [Validators.required]],
      problema:['', [Validators.required]],
      descripcion:['', Validators.required]
    })
  }

  async enviarSug(){
    const loading = await this.loadingCTRL.create();
    await loading.present();

    const sugerencia = await this.dataService.addSugerencia(this.soporte.value);
    await loading.dismiss();

    if (sugerencia) {
      this.router.navigateByUrl('/tabs/tab3')
      this.alerta('Datos enviados', 'Gracias por sus sugerencias');
    } else {
      this.alerta('Fallo al iniciar', 'Intentelo de nuveo');
    }
  }

  async alerta(header, message) {
    const alert = await this.alertCTRL.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}

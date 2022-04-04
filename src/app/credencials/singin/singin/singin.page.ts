import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SingupPage } from '../../singup/singup/singup.page';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.page.html',
  styleUrls: ['./singin.page.scss'],
})
export class SinginPage implements OnInit {
  credenciales: FormGroup;
  @Input() id: string;

  constructor(
    private modalCTRL: ModalController,
    private authCTRL: Auth,
    private authService: AuthserviceService,
    private loadingCTRL: LoadingController,
    private fb: FormBuilder,
    private router: Router,
    private alertCTRL: AlertController
  ) { }

  get email() {
    return this.credenciales.get('email')
  }

  get password() {
    return this.credenciales.get('password')
  }

  ngOnInit() {
    this.credenciales = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async ingreso() {
    const loading = await this.loadingCTRL.create();
    await loading.present();
    try{
      const user = await this.authService.ingreso(this.credenciales.value)

      if (user) {
        this.router.navigateByUrl('/perfil')
        await loading.dismiss();
      } else {
        this.alerta('Fallo al iniciar', 'Intentelo de nuveo');
        await loading.dismiss();
      }
    } catch(err){
      await loading.dismiss();
      this.alerta('Fallo al iniciar', 'Favor de verificar sus datos');
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

  async registrar() {
    await this.router.navigateByUrl('singup', {replaceUrl: true});
  }
}

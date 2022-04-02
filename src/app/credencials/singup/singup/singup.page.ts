import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { FirebaseService, Users } from 'src/app/service/firebase.service';
import { SinginPage } from '../../singin/singin/singin.page';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  @Input() id: string;
  credenciales:FormGroup;
  user: Users[] = [];
  emailtest:any;

  constructor(
    private modalCTRL: ModalController,
    private dataService: FirebaseService,
    private toastCTRL: ToastController,
    private authService: AuthserviceService,
    private loadingCTRL: LoadingController,
    private fb: FormBuilder,
    private alertCTRL: AlertController,
    private router: Router
  ) { }

  get name(){
    return this.credenciales.get('nombre')
  }
  get email(){
    return this.credenciales.get('email');
  }

  get password(){
    return this.credenciales.get('password');
  }

  ngOnInit() {
    this.credenciales = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(10)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(4)]]
    })
  }

  async registrar(){
    const loading = await this.loadingCTRL.create();
    await loading.present();

    const user = await this.authService.registro(this.credenciales.value);
    this.dataService.addUser(this.credenciales.value);
    await loading.dismiss();

    if(user){
      this.modalCTRL.dismiss();
      const toast = this.toastCTRL.create({
        message: "Usuario creado con éxito",
        color: "success",
        duration: 2000
      });
      (await toast).present();
    }else{
      this.alerta('Registro fallido', 'Favor de volverlo a intentar')
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

  async ingresar(){
    await this.router.navigateByUrl('singin')
  }
}



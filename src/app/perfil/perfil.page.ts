import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthserviceService } from '../service/authservice.service';
import { Auth } from '@angular/fire/auth';
import { FirebaseService, Users } from '../service/firebase.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile = null;
  nombre:String;
  email:String;
  contrasena:String;
  id:String;
  user: Users[];
  userREF:any;
  userR:any


  constructor(
    private auth: AuthserviceService,
    private router: Router,
    private alertCTRL: AlertController,
    private loadingCTRL: LoadingController,
    private atuhUser: Auth,
    private dataService: FirebaseService,
    private tastCTRL: ToastController,
    private authUser: Auth
  ) { }

  
  ngOnInit() {
    var email;
    this.atuhUser.onAuthStateChanged(function (user) {
      email = user.email;
    });
    this.authUser.onAuthStateChanged(user=>{
      this.userR = user
    })
    var userREF;
    this.dataService.getUsuarios().subscribe(res=>{
      res.forEach(element => {
        if(String(element.email) == String(email)){
          this.nombre = element.nombre;
          this.email = element.email;
          this.contrasena = element.password;
          this.id = element.id;
          userREF = element;
        }
      });
      this.userREF = userREF
    });
  }
  async logout(){
    this.auth.salida();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  regresar(){
    this.router.navigateByUrl('/tabs/tab3', {replaceUrl: true});
  }

  async editUser(){
    const alert = await this.alertCTRL.create({
      header:'Editar cuenta',
      inputs:[
        {
          name:'nombre',
          placeholder: String(this.nombre),
          type:'text',
          value: this.nombre
        },
        {
          name:'email',
          placeholder:String(this.email),
          type:'text',
          value: this.email
        },
        {
          name:'password',
          placeholder:String(this.contrasena),
          type:'text',
          value: this.contrasena
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel'
        },
        {
          text:'Guardar',
          handler:res=>{
            this.dataService.updateUser(
              {
                id:String(this.id),
                nombre:res.nombre,
                email:res.email,
                password:res.password,
                bicicleta:""
              }
              )
              this.auth.updateUser(this.userR, res.email);
              this.auth.updatePasswor(this.userR, res.password);
            //console.log('El contacto se esta guardando');
          }
        }
      ]
    });
    await alert.present();
    
  }

  async eliminar(){
    const loading = await this.loadingCTRL.create();
    await loading.present();

    this.auth.eliminar(this.userR);
    this.dataService.deletUser(this.userREF)
    await loading.dismiss();
    this.auth.salida();
    this.router.navigateByUrl('/', {replaceUrl: true});
    const toast = await this.tastCTRL.create({
      message: "Usuario eliminado",
      duration: 2000,
      color: "danger"
    })

    toast.present();
    /*
    this.router.navigateByUrl('tabs/tab3')
    this.dataService.deletUser(this.user);
    this.auth.salida();
    const toast = await this.tastCTRL.create({
      message: "Usuario eliminado",
      duration: 2000,
      color: "danger"
    })
  */
  }
}

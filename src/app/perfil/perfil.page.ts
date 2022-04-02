import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile = null;

  constructor(
    private auth: AuthserviceService,
    private router: Router,
    private alertCTRL: AlertController,
    private loadCTRL: LoadingController
  ) { }

  ngOnInit() {
  }

  async logout(){
    this.auth.salida();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }



}

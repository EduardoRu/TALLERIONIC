import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { CentralPage } from 'src/app/productos/central/central.page';
import { ArticulosPage } from 'src/app/productos/articulos/articulos.page';
import { InferiorPage } from 'src/app/productos/inferior/inferior.page';
import { Tab1Page } from 'src/app/tab1/tab1.page';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() nomCategoria: string="";

  constructor(
    private menu:MenuController,
    private route:Router,
    private modealCTRL: ModalController
  ) { }

  ngOnInit() {
  }

  async openMenu(){
    await this.menu.open();
  }

  async superior(){
    await this.route.navigateByUrl('tabs/tab1');
  }

  async central(){
    await this.route.navigateByUrl('prod/central');
  }

  async inferior(){
    await this.route.navigateByUrl('prod/inferior');
  }
  
  async articulos(){
    await this.route.navigateByUrl('prod/articulos');
  }

}

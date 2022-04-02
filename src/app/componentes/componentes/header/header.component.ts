import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() nomCategoria: string="";

  constructor(
    private menu:MenuController,
    private route:Router
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

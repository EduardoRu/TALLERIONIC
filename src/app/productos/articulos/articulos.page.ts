import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirebaseService, producto, Users } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  articulos:producto[];
  usuarios: Users[];

  constructor(
    private dataService:FirebaseService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataService.getProductoArticulo().subscribe(res=>{
      this.articulos = res;
      this.cd.detectChanges;
      console.log(this.articulos)
    });
  }

}

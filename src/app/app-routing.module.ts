import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['singin']);
const redirectLoggedInToTab = () => redirectLoggedInTo(['perfil'])


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'singin',
    loadChildren: () => import('./credencials/singin/singin/singin.module').then( m => m.SinginPageModule),
    ...canActivate(redirectLoggedInToTab)
  },
  {
    path: 'singup',
    loadChildren: () => import('./credencials/singup/singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'ser/cita',
    loadChildren: () => import('./cita/cita.module').then( m => m.CitaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./soporte/soporte.module').then( m => m.SoportePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'prod/inferior',
    loadChildren: () => import('./productos/inferior/inferior.module').then( m => m.InferiorPageModule)
  },
  {
    path: 'prod/central',
    loadChildren: () => import('./productos/central/central.module').then( m => m.CentralPageModule)
  },
  {
    path: 'prod/articulos',
    loadChildren: () => import('./productos/articulos/articulos.module').then( m => m.ArticulosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule) // Clave de la carga perezosa, cuando esta función se cargue, accederemos a las rutas hijas definidas en en modulo especificado
  },
  {
    path:'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(m => m.HeroesModule) 
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

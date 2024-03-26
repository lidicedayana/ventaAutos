import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PagListaVehiculosComponent } from './paginas/pagListaVehiculos/pagListaVehiculos.component';
import { PageNotFoundComponent } from './paginas/pageNotFound/pageNotFound.component';
import { PagVehiculosComponent } from './paginas/pagVehiculos/pagVehiculos.component';
import { PagRegistroVehiculoComponent } from './paginas/pagRegistroVehiculo/pagRegistroVehiculo.component';
import { PagEditarVehiculoComponent } from './paginas/pagEditarVehiculo/pagEditarVehiculo.component';
import { PagRegistrarClienteComponent } from './paginas/pagRegistrarCliente/pagRegistrarCliente.component';

const routes: Routes = [
  {
    path: "home", 
    component: HomeComponent
  },
  {
    path: "vehiculos", 
    component: PagListaVehiculosComponent,
    
  },
  {
    path: "clientes", 
    component: PagRegistrarClienteComponent,
    
  },
  {
    path: "vehiculo", 
    component: PagRegistroVehiculoComponent
    
  },
  {
    path: "vehiculo/:codigo", 
    component: PagEditarVehiculoComponent
  },
  {
    path: "vehiculos/:codigo", 
    component: PagVehiculosComponent
    
  },
  {
    path: "", 
    component: PagListaVehiculosComponent,
    pathMatch:"full"
  },
  {
    path: "**", 
    component: PageNotFoundComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

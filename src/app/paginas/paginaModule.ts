import { NgModule } from '@angular/core';
import { PagListaVehiculosComponent } from './pagListaVehiculos/pagListaVehiculos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { utilitariosModule } from '../utilitarios/utilitariosModule';
import { PagVehiculosComponent } from './pagVehiculos/pagVehiculos.component';
import { RouterModule } from '@angular/router';
import { PagRegistroVehiculoComponent } from './pagRegistroVehiculo/pagRegistroVehiculo.component';
import { PagEditarVehiculoComponent } from './pagEditarVehiculo/pagEditarVehiculo.component';
import { PagRegistrarClienteComponent } from './pagRegistrarCliente/pagRegistrarCliente.component';
import { PagListaClientesComponent } from './pagListaClientes/pagListaClientes.component';
import { PadEditarClienteComponent } from './padEditarCliente/padEditarCliente.component';


@NgModule({
    declarations: [
        PagListaVehiculosComponent,
        PagVehiculosComponent,
        PagRegistroVehiculoComponent,
        PagEditarVehiculoComponent,
        PagRegistrarClienteComponent,
        PagListaClientesComponent,
        PadEditarClienteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        utilitariosModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        PagListaVehiculosComponent,
        PagVehiculosComponent,
        PagRegistroVehiculoComponent,
        PagEditarVehiculoComponent,
        PagRegistrarClienteComponent,
        PagListaClientesComponent,
        PadEditarClienteComponent
    ]
  })
  export class paginaModule { }
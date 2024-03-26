import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AEspacioPipe } from './pipes/AEspacio.pipe';
import { CalificacionComponent } from './componentes/calificacion/calificacion.component';

@NgModule({
    declarations: [
        AEspacioPipe,
        CalificacionComponent
    ],
    imports: [
        CommonModule,
        FormsModule 
    ],
    exports: [
        AEspacioPipe,
        CalificacionComponent
    ]
  })
  export class utilitariosModule { }
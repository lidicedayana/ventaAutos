import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Respuesta } from '../utilitarios/modelos/Respuesta';
import { Cliente } from '../utilitarios/modelos/Cliente';
import { RespuestaCliente } from '../utilitarios/modelos/RespuestaCliente';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private http: HttpClient
    ) { }
   baseUrl = "http://www.epico.gob.ec/vehiculo/public/api/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getVehiculos(filtro?:string, rows?:number, page?:number): Observable<Respuesta>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    // return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body}).pipe(
    //   map(respuesta => respuesta.data)
    // )
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body});
  }

  // getVehiculos(filtro:any):Observable<Array<Vehiculo>>{
  //   const escucha: Observable<Array<Vehiculo>> = new Observable(escuchando => {
  //     let lista = this.listaVehiculos.filter(ele => ele.marca?.toLowerCase().includes(filtro.toLowerCase()));
  //     escuchando.next(lista);
  //   });
  //   return escucha;
  // }
  insertVehiculos(vehiculo:Vehiculo){

    return this.http.post<Respuesta>(this.baseUrl+"vehiculo/", vehiculo, this.httpOptions)

  }

  getVehiculo( codigo: string){
    return this.http.get<Respuesta>(this.baseUrl+"vehiculo/"+codigo)
  }
  // getVehiculo(codigo: string): Observable<Vehiculo | undefined> {
  //   const escucha: Observable<Vehiculo | undefined> = new Observable(escuchando => {
  //     setTimeout(
  //       () => {
  //     let vehiculo = this.listaVehiculos.find(ele => ele.codigo === codigo);
  //         escuchando.next(vehiculo);
  //       }, 1000);
  //   });
  //   return escucha;
  // }


  addVehiculo(vehiculo: Vehiculo) {
    this.listaVehiculos.push(vehiculo);
  }

  actualizarVehiculo(vehiculo:Vehiculo, codigo: string){
    return this.http.put<Respuesta>(this.baseUrl+"vehiculo/"+codigo, vehiculo, this.httpOptions);
  }

  eliminarVehiculo(codigo: string){
    return this.http.delete<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }

  private listaVehiculos: Array<Vehiculo> = [
    // { "codigo": "A001", "marca": "Chevrolet", "modelo": "Onix-6", "color": "Azul", "kilometraje": "50000", "precio": 17000, "foto": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/master/portuguese/index/cars/2019-onix-activ/colorizer/01-images/novo-onix-activ-azul-inifity-mov-intro-06.jpg?imwidth=1200", "anio": 2023, "calificacion": 3 },
    // { "codigo": "A002", "marca": "Kia", "modelo": "Rio-2", "color": "Rojo", "kilometraje": "10000", "precio": 19000, "foto": "https://th.bing.com/th/id/R.f62cfd5bc8d04053902e9e983c141a58?rik=o1IUiSLMbi%2fQ0Q&pid=ImgRaw&r=0", "anio": 2023, "calificacion": 4 },
    // { "codigo": "A003", "marca": "Chery", "modelo": "Arrizo-5", "color": "Blanco", "kilometraje": "20000", "precio": 15000, "foto": "https://unimotors.ec/assets/img/chery/arrizo-5.png", "anio": 2023, "calificacion": 3 },
    // { "codigo": "A004", "marca": "Toyota", "modelo": "Agya", "color": "Amarillo", "kilometraje": "35000", "precio": 20000, "foto": "https://th.bing.com/th/id/R.4227cb2abfd73211253275d49ae81dfc?rik=kOa%2fRfo4VsgeAw&pid=ImgRaw&r=0", "anio": 2023, "calificacion": 3 },
    // { "codigo": "A005", "marca": "Hyundai", "modelo": "Accent", "color": "Negro", "kilometraje": "5000", "precio": 30000, "foto": "https://th.bing.com/th/id/R.ef8cd9c66c9de1ddce82ac2d629198ca?rik=g3UDkc7YuAMAxg&pid=ImgRaw&r=0", "anio": 2023, "calificacion": 3 },

  ];

  insertarCliente(cliente:Cliente){
    return this.http.post<RespuestaCliente>(this.baseUrl+"cliente/", cliente, this.httpOptions)
  }

  getClientes(filtro?:string, rows?:number, page?:number): Observable<RespuestaCliente>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    // return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body}).pipe(
    //   map(respuesta => respuesta.data)
    // )
    return this.http.get<RespuestaCliente>(this.baseUrl+"clientes/", {params: body});
  
  }

  eliminarCliente(id: number){
    return this.http.delete<RespuestaCliente>(this.baseUrl+"cliente/"+id);
  }

  getCliente( id: number){
    return this.http.get<RespuestaCliente>(this.baseUrl+"cliente/"+id)
  }

  actualizarCliente(cliente:Cliente, id: number){
    return this.http.put<RespuestaCliente>(this.baseUrl+"cliente/"+id, cliente, this.httpOptions);
  }
}

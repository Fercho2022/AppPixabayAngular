import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$= new Subject<string>();
  private terminoBusqueda$=new Subject<string>();
  private quitarImagenes$=new Subject<boolean>();

  constructor(private http:HttpClient) { }


setError(mensaje:string){
  this.error$.next(mensaje);

}

getError():Observable<string>{
  return this.error$.asObservable();
}

enviarTerminoBusqueda(termino:string){
  this.terminoBusqueda$.next(termino);

}

recibirTerminoBusqueda():Observable<string>{
  return this.terminoBusqueda$.asObservable();
}

getImagenes(paginacion:any):Observable<any>{
  const KEY='35472721-1448f17328e9e33ff77af3dfe';
  const URL= `https://pixabay.com/api/?key=${KEY}&q=${paginacion.termino}&per_page=${paginacion.imgPorPagina}&page=${paginacion.pagina}`;
  return this.http.get(URL);
}

setImagenes(eliminar:boolean){
  this.quitarImagenes$.next(eliminar);
}

getImg():Observable<boolean>{
  return this.quitarImagenes$.asObservable();
}
}

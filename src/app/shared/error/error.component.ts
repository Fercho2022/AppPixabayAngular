import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  textoError:string='';
  mostrarError:boolean=false;
  suscripcion:Subscription;


   constructor(private _buscarImagenService:ImagenService){
    this.suscripcion=this._buscarImagenService.getError().subscribe(data=>{

      this.mostrarMensaje();
      this.textoError=data;
    })
   }

   mostrarMensaje(){
    this.mostrarError=true;
    setTimeout(() => {
      this.mostrarError=false;
    }, 2000);

   }

   ngOnDestroy():void{
    this.suscripcion.unsubscribe();
   }
}

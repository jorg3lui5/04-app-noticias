import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticiasFavoritos: Article[] = [];

  constructor(
    private nativeStorage: NativeStorage,
    public toastController: ToastController,
  ) 
  {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article){
    const existe = this.noticiasFavoritos.find(noti=>noti.title=noticia.title);
    console.log(existe);
    if(!existe){
      this.noticiasFavoritos.unshift(noticia);
      console.log(this.noticiasFavoritos);
      this.nativeStorage.setItem('favoritos', this.noticiasFavoritos).then(()=>{
        this.presentToast('Agregado a favoritos')
        //alert('Guardado en Favoritos');
      })
    }
  }

  async cargarFavoritos(){
    console.log('cargar');
    // this.nativeStorage.getItem('favoritos').then((favoritos) => {
    //   console.log('favoritos: ',favoritos);
    // },
    // error => {
    //   console.error(error)
    // });
    const favoritos = await this.nativeStorage.getItem('favoritos');
    console.log('async await: ',favoritos);
    if(favoritos){
      this.noticiasFavoritos = favoritos;
    }
  }

  borrarNoticia(noticia: Article){
    this.noticiasFavoritos=this.noticiasFavoritos.filter(noti=>noti.title!==noticia.title);
    this.nativeStorage.setItem('favoritos', this.noticiasFavoritos).then(()=>{
      this.presentToast('Eliminado de favoritos')
      //alert('Eliminidado de Favoritos');
    })
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }
}

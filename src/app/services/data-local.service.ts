import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticiasFavoritos: Article[] = [];

  constructor(
    private nativeStorage: NativeStorage,

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
        alert('Giuard');

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
}

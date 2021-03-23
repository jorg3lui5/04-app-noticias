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

  }

  guardarNoticia(noticia: Article){
    const existe = this.noticiasFavoritos.find(noti=>noti.title=noticia.title);
    if(!existe){
      this.noticiasFavoritos.unshift(noticia);
      console.log(this.noticiasFavoritos)
      this.nativeStorage.setItem('favoritos', this.noticiasFavoritos)
      .then(() => alert('guardado'),
        error => console.error('Error storing item', error)
      );
    }
  }

  cargarFavoritos(){
    
  }
}

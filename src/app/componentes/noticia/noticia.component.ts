import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  
  constructor(
    private iab: InAppBrowser
  ) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
    //abre correctamenrte dentro de la app como debe de ser. Si quiero que aparezca la barra de navegacion, cambiar location:yes
    //this.iab.create(this.noticia.url,'_blank',{location: 'no'});
  }
}

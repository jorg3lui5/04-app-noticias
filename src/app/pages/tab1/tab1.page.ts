import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  //noticias: Article[]= [];
  noticias: Article[]= [{
    source: {id: 'id',name: 'nom'},
    author: 'AAA',
    title: 'NUEVO',
    description: 'ABC',
    url: 'https://www.typescriptlang.org/docs/handbook/interfaces.html',
    urlToImage: 'https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=tEiqzpyZB9KQ34ElgK5VT8$daE2N3K4ZzOUsqbU5sYvO$hCK717SNqjH3GhHEJaH6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg',
    publishedAt: 'AAAA',
    content: 'dbdbdbd',
  }];
  constructor(
    private _noticiasService: NoticiasService
  )
  {

  }

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this._noticiasService.getTopHeadLines()
    .subscribe(resp=>{
      console.log('noticias', resp);
      if(event && resp.articles.length===0){
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      //this.noticias=resp.articles;
      //se hace push para que no reemplace las noticias existentes
      this.noticias.push(...resp.articles);
      if(event) {
        event.target.complete();
      }
    });
  }
}
